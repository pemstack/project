import {
	Injectable,
	BadRequestException,
	NotFoundException,
	ForbiddenException,
	UnauthorizedException
} from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import {
	Course,
	CoursePage,
	CoursePermission,
	CoursePermissionLevel,
	CourseAccess,
	PageAccess
} from './courses.entity'
import { EntityManager } from 'typeorm'
import uniqid from 'uniqid'
import slugify from 'slugify'
import { unionBy } from 'lodash'
import { reduceObject } from 'common/utils'

export interface CreateCourseParams {
	ownerId: string
	title: string
	access: CourseAccess
}

export interface CreateCoursePageParams {
	courseId: string
	userId: string
	title: string
	content?: string
	access: PageAccess
}

export interface EditCoursePageParams {
	courseId: string
	pageId: string
	userId: string
	title?: string
	content?: string
	access?: PageAccess
}

export interface CourseInfo {
	id: string
	title: string
	permission: CoursePermissionLevel
	owner: boolean
}

export interface CoursePageInfo {
	pageId: string
	title: string
	access: PageAccess
}

@Injectable()
export class CoursesService {
	constructor(@InjectEntityManager() readonly entities: EntityManager) {}

	async createCourse({
		ownerId,
		title,
		access = CourseAccess.Private
	}: CreateCourseParams): Promise<string> {
		const id = uniqid()
		await this.entities.insert(Course, {
			id,
			ownerId,
			title,
			access
		})

		return id
	}

	async createCoursePage({
		courseId,
		userId,
		title,
		content = '',
		access = PageAccess.Private
	}: CreateCoursePageParams): Promise<string> {
		const coursePermission = await this.tryGetPermission(courseId, userId)
		if (!coursePermission) {
			throw new NotFoundException()
		}

		if (coursePermission.permissionLevel !== CoursePermissionLevel.Write) {
			throw new ForbiddenException()
		}

		const pageId = slugify(title, { lower: true })

		if (
			await this.entities.findOne(CoursePage, {
				courseId,
				pageId
			})
		) {
			throw new BadRequestException('Page already exists.')
		}

		await this.entities.insert(CoursePage, {
			courseId,
			pageId,
			title,
			content,
			access
		})

		return pageId
	}

	async editCoursePage({
		courseId,
		pageId,
		userId,
		title,
		content,
		access
	}: EditCoursePageParams): Promise<string> {
		const coursePermission = await this.tryGetPermission(courseId, userId)
		if (!coursePermission) {
			throw new NotFoundException()
		}

		if (coursePermission.permissionLevel !== CoursePermissionLevel.Write) {
			throw new ForbiddenException()
		}

		const newPageId = title ? slugify(title, { lower: true }) : pageId

		if (pageId !== newPageId) {
			if (
				await this.entities.findOne(CoursePage, {
					courseId,
					pageId: newPageId
				})
			) {
				throw new BadRequestException('Page name already exists.')
			}
		}

		await this.entities.update(
			CoursePage,
			{
				courseId,
				pageId
			},
			reduceObject({
				pageId: newPageId,
				title,
				content,
				access
			})
		)

		return newPageId
	}

	async deleteCoursePage(userId: string, courseId: string, pageId: string) {
		if (!userId) {
			throw new UnauthorizedException()
		}

		const coursePermission = await this.tryGetPermission(courseId, userId)
		if (!coursePermission) {
			throw new NotFoundException()
		}

		if (coursePermission.permissionLevel !== CoursePermissionLevel.Write) {
			throw new ForbiddenException()
		}

		const result = await this.entities.delete(CoursePage, {
			where: { courseId, pageId }
		})

		// if (result.affected === 0) {
		//   throw new NotFoundException()
		// }
	}

	async getCourses(userId: string): Promise<CourseInfo[]> {
		const courses = await this.entities.find(Course, {
			where: { ownerId: userId }
		})

		const permission = await this.entities.find(CoursePermission, {
			where: { userId },
			relations: ['course']
		})

		const ownCourses = courses.map(c => ({
			id: c.id,
			title: c.title,
			permission: CoursePermissionLevel.Write,
			owner: true
		}))

		const otherCourses = permission.map(a => ({
			id: a.courseId,
			title: a.course.title,
			permission: a.permissionLevel,
			owner: false
		}))

		return unionBy(ownCourses, otherCourses, c => c.id)
	}

	async getCoursePages(
		userId: string | null,
		courseId: string
	): Promise<CoursePageInfo[]> {
		const permission = await this.tryGetPermission(courseId, userId)
		if (!permission) {
			throw new NotFoundException()
		}

		if (permission.permissionLevel === CoursePermissionLevel.None) {
			throw new ForbiddenException()
		}

		return await this.entities.find(CoursePage, {
			select: ['pageId', 'title', 'access'],
			where: { courseId }
		})
	}

	async getCoursePage(
		userId: string | null,
		courseId: string,
		pageId: string
	): Promise<CoursePage> {
		const permission = await this.tryGetPermission(courseId, userId)
		if (!permission) {
			throw new NotFoundException()
		}

		if (permission.permissionLevel === CoursePermissionLevel.None) {
			if (userId) {
				throw new ForbiddenException()
			} else {
				throw new UnauthorizedException()
			}
		}

		const page = await this.entities.findOne(CoursePage, {
			pageId,
			courseId
		})

		if (!page) {
			throw new NotFoundException()
		}

		if (!userId && page.access !== PageAccess.Public) {
			throw new UnauthorizedException()
		}

		return page
	}

	async tryGetPermission(
		courseId: string,
		userId: string | null
	): Promise<null | {
		course: Course
		permissionLevel: CoursePermissionLevel
	}> {
		const course = await this.entities.findOne(Course, {
			id: courseId
		})

		if (!course) {
			return null
		}

		if (userId && course.ownerId === userId) {
			return {
				course,
				permissionLevel: CoursePermissionLevel.Write
			}
		}

		if (!userId) {
			return {
				course,
				permissionLevel:
					course.access === CourseAccess.Public
						? CoursePermissionLevel.Read
						: CoursePermissionLevel.None
			}
		}

		const permission = await this.entities.findOne(CoursePermission, {
			courseId,
			userId
		})

		return {
			course,
			permissionLevel: permission
				? permission.permissionLevel
				: CoursePermissionLevel.None
		}
	}
}
