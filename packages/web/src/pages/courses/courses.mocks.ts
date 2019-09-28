import { MockApi, delay } from 'app/mock'
import { Dictionary } from '@pema/utils'
import {
  GET_COURSE_PAGES,
  GET_COURSE_PAGE,
  GET_COURSE_PERMISSION,
  GET_COURSES,
  CoursePermission,
  GetCoursePageResult,
  DELETE_COURSE_PAGE,
  UPDATE_COURSE_PAGE,
  CREATE_COURSE_PAGE,
  PageAccess,
  ExistingFile,
  GET_COURSE_POSTS,
  CREATE_COURSE_POST,
  GetCoursePostsResultItem,
  DEFAULT_PAGE_SIZE,
  GetCourseMembersResult,
  GET_COURSE_MEMBERS,
  DELETE_COURSE_MEMBER
} from 'pages/courses/courses.api'
import slugify from 'slugify'

const longMarkdown = `
## Project 1 deadline

Project 1 deadline is set to **19/08/2019 23:59**.
Source code must be published to [Github](https://github.com).
Lorem ipsum dolor sit amet, consectetur adipiscing elit \`sayHello('World')\`.
Donec non arcu elit.  $y = 2x+3$
Suspendisse volutpat nec nibh et malesuada.

\`\`\`js
function sayHello(name) {
  console.log('Hello ' + name)
}

function arraySum(array) {
  let sum = 0
  for (let i = 0, i < array.length; i++) {
    sum += array[i]
  }

  return sum
}
\`\`\`

### More info

Fusce fermentum leo et metus egestas,
hendrerit pellentesque lacus congue.

---

Donec pulvinar et lorem at pellentesque.

\`\`\`xml
<root>
  <name>Test</name>
  <age value="30" />
</root>
\`\`\`

In aliquam scelerisque porttitor.

> Donec sem tellus, sollicitudin in tristique eu, rhoncus a enim.
> Phasellus dignissim blandit magna nec maximus.

Morbi ultrices efficitur porttitor.

$$
y = \\sum_{i=0}^{n}{(3i^2-5)}
$$

Cras at viverra odio. Donec id accumsan ligula. Vestibulum lacinia arcu mi, nec tempus massa convallis vel.
Suspendisse quis elit at diam maximus venenatis. Cras iaculis rutrum posuere.
Fusce tempor elementum risus, quis vulputate sem accumsan ut.
Nulla sed quam eget arcu posuere dictum vel et elit. Morbi efficitur mollis suscipit.
Nullam aliquam quam id sollicitudin lobortis. Curabitur scelerisque finibus rutrum.

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

Phasellus id justo id turpis pulvinar cursus in vel erat.
Sed consectetur ante odio, a vulputate felis malesuada vel.
`.trim()

export function cleanupObject<T extends { [key: string]: any }>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc: Dictionary, [key, val]) => {
    if (val !== undefined && val !== null) {
      acc[key] = val
    }

    return acc
  }, {}) as Partial<T>
}

class MockCourse {
  courseId: string
  title: string
  permission: CoursePermission
  owner: boolean
  pages: GetCoursePageResult[]
  posts: GetCoursePostsResultItem[]
  members: GetCourseMembersResult[]

  constructor(data: Partial<MockCourse>) {
    Object.assign(this, data)
  }

  findPage(pageId: string) {
    const page = this.pages.find(p => p.pageId === pageId)
    if (!page) {
      throw makeError(404, `Page '${pageId}' not found.`)
    }

    return page
  }

  updatePage(pageId: string, params: {
    title?: string
    access?: PageAccess
    content?: string,
    files?: ExistingFile[],
    removedFiles?: string[]
  }) {
    const cleaned = cleanupObject(params)
    this.pages = this.pages.map(page => {
      if (page.pageId === pageId) {
        const { files: newFiles = [], removedFiles = [] } = params
        const files = [...(page.files || []), ...newFiles].filter(f => !removedFiles.includes(f.uid))
        return { ...page, ...cleaned, files, pageId: slugify(cleaned.title || page.title, { lower: true }) }
      } else {
        return page
      }
    })

    return this.findPage(pageId)
  }

  addPage(page: string | GetCoursePageResult) {
    if (typeof page === 'string') {
      this.pages.push({
        access: 'private',
        pageId: slugify(page, { lower: true }),
        courseId: this.courseId,
        title: page,
        content: '',
        files: []
      })
    } else {
      this.pages.push(page)
    }
  }

  deletePage(pageId: string) {
    this.pages = this.pages.filter(page => page.pageId !== pageId)
  }
}

interface PageData {
  title: string
  files?: ExistingFile[]
}

function makePage(
  courseId: string,
  { title, files = [] }: PageData,
): GetCoursePageResult {
  const id = slugify(title, { lower: true })
  return {
    title,
    pageId: id,
    access: 'public',
    content: longMarkdown,
    courseId,
    files
  }
}

function makeError(status: number, message?: string) {
  const error = new Error(message);
  (error as any).status = status
  return error
}

const existingFiles: ExistingFile[] = [
  {
    uid: 'file-1',
    name: 'File-1.pdf',
    size: 200,
    type: 'application/pdf'
  },
  {
    uid: 'file-2',
    name: 'File-2.pdf',
    size: 200,
    type: 'application/pdf'
  },
  {
    uid: 'file-3',
    name: 'File-3.pdf',
    size: 200,
    type: 'application/pdf'
  }
]

class MockCourses {
  private courses: MockCourse[]

  constructor() {
    const now = new Date()
    const dates = [new Date(), new Date(), new Date(), new Date(), new Date()].map((d, i) => {
      d.setHours(now.getHours() - i * 0.5 - 0.5 * Math.random())
      return d
    })

    this.courses = [
      new MockCourse({
        courseId: 'siguria',
        title: 'Siguria e te dhenave',
        permission: 'write',
        owner: true,
        pages: [
          makePage('siguria', { title: 'Info', files: existingFiles }),
          makePage('siguria', { title: 'Projects' }),
          makePage('siguria', { title: 'Resources' })
        ],
        posts: dates.map((date, i) => ({
          postId: (i + 1).toString(),
          posted: date,
          content: `Hello from post ${i + 1}`,
          authorId: 'author_id',
          authorName: 'Filan Fisteku'
        })),
        members: [
          {
            name: 'Florentina Haxhimustafaj',
            email: 'first1.last1@example.com',
            permission: 'write',
            status: 'member'
          },
          {
            name: 'Nexhmedin Demehajdaraj',
            email: 'first2.last2@example.com',
            permission: 'read',
            status: 'member'
          },
          {
            name: 'Muzafer Mahmutdemaj',
            email: 'first3.last3@example.com',
            permission: 'read',
            status: 'invited'
          },
          {
            name: 'Dea Aliu',
            email: 'first4.last4@example.com',
            permission: 'read',
            status: 'invited'
          }
        ]
      })
    ]
  }

  list() {
    return this.courses
  }

  findCourse(courseId: string) {
    const course = this.courses.find(c => c.courseId === courseId)
    if (!course) {
      throw makeError(404, `Course '${courseId}' not found.`)
    }

    return course
  }
}

let courses = new MockCourses()

export function mockCourses(api: MockApi) {
  api.withQuery(GET_COURSES, async () => {
    await delay(500)
    return courses.list()
  })

  api.withQuery(GET_COURSE_PAGES, async ({ courseId }) => {
    await delay(500)
    return courses.findCourse(courseId).pages
  })

  api.withQuery(GET_COURSE_PAGE, async ({ courseId, pageId }) => {
    await delay(500)
    return courses.findCourse(courseId).findPage(pageId)
  })

  api.withQuery(GET_COURSE_POSTS, async ({
    courseId,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE
  }) => {
    await delay(500)
    const posts = courses.findCourse(courseId).posts || []
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return {
      items: posts.slice(start, end),
      total: posts.length,
      pageSize: Math.min(pageSize, 15)
    }
  })

  api.withAction(DELETE_COURSE_PAGE, async ({ courseId, pageId }) => {
    await delay(500)
    courses.findCourse(courseId).deletePage(pageId)
  })

  api.withAction(
    UPDATE_COURSE_PAGE,
    async ({ courseId, pageId, ...params }) => {
      await delay(500)
      const page = courses.findCourse(courseId).updatePage(pageId, params)
      return { courseId, pageId: slugify(params.title || page.title, { lower: true }) }
    }
  )

  api.withAction(
    CREATE_COURSE_POST,
    async ({ courseId, content }) => {
      await delay(500)
      const course = courses.findCourse(courseId)
      const posts = course.posts || []
      course.posts = [{
        postId: (posts.length + 1).toString(),
        posted: new Date(),
        content,
        authorId: 'author_id',
        authorName: 'Filan Fisteku'
      }, ...posts]
    }
  )

  api.withQuery(GET_COURSE_PERMISSION, async ({ courseId: id }) => {
    await delay(500)
    return {
      permission: courses.findCourse(id).permission
    }
  })

  api.withAction(CREATE_COURSE_PAGE, async ({ courseId, title }) => {
    await delay(500)
    courses.findCourse(courseId).addPage(title)
  })

  api.withQuery(GET_COURSE_MEMBERS, async ({ courseId }) => {
    await delay(500)
    return courses.findCourse(courseId).members || []
  })

  api.withAction(DELETE_COURSE_MEMBER, async ({ courseId, email }) => {
    await delay(500)
    const course = courses.findCourse(courseId)
    const members = course.members || []
    course.members = members.filter(m => m.email !== email)
  })
}

export function reloadCourses() {
  courses = new MockCourses()
}
