import { MockApi, delay } from 'app/mock'
import {
  GET_COURSE_PAGES,
  GET_COURSE_PAGE,
  GET_COURSE_PERMISSION,
  GET_COURSES,
  CoursePage,
  Course,
  CoursePermission,
  CoursePageDetails,
  DELETE_COURSE_PAGE,
  UPDATE_COURSE_PAGE_ACCESS
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

class MockCourse implements Course {
  id: string
  title: string
  permission: CoursePermission
  owner: boolean
  pages: Array<CoursePage & CoursePageDetails>

  constructor(data: Partial<MockCourse>) {
    Object.assign(this, data)
  }

  findPage(id: string) {
    const page = this.pages.find(p => p.id === id)
    if (!page) {
      throw makeError(404)
    }

    return page
  }

  addPage(page: CoursePage & CoursePageDetails) {
    this.pages.push(page)
  }

  deletePage(pageId: string) {
    this.pages = this.pages.filter(page => page.pageId !== pageId)
  }
}

interface PageData {
  title: string
}

function makePage(courseId: string, {
  title
}: PageData): CoursePage & CoursePageDetails {
  const id = slugify(title, { lower: true })
  return {
    title,
    id,
    pageId: id,
    access: 'public',
    content: longMarkdown,
    courseId
  }
}

function makeError(status: number) {
  const error = new Error();
  (error as any).status = status
  return error
}

class MockCourses {
  private courses: MockCourse[]

  constructor() {
    this.courses = [
      new MockCourse({
        id: 'siguria',
        title: 'Siguria e te dhenave',
        permission: 'write',
        owner: true,
        pages: [
          makePage('siguria', { title: 'Info' }),
          makePage('siguria', { title: 'Projects' }),
          makePage('siguria', { title: 'Resources' })
        ]
      })
    ]
  }

  list() {
    return this.courses
  }

  findCourse(id: string) {
    const course = this.courses.find(c => c.id === id)
    if (!course) {
      throw makeError(404)
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

  api.withQuery(GET_COURSE_PAGES, async ({ id }) => {
    await delay(500)
    return courses.findCourse(id).pages
  })

  api.withQuery(GET_COURSE_PAGE, async ({ courseId, pageId }) => {
    await delay(500)
    return courses.findCourse(courseId).findPage(pageId)
  })

  api.withAction(DELETE_COURSE_PAGE, async ({ courseId, pageId }) => {
    await delay(500)
    courses.findCourse(courseId).deletePage(pageId)
  })

  api.withAction(UPDATE_COURSE_PAGE_ACCESS, async ({ courseId, pageId, access }) => {
    await delay(500)
    courses.findCourse(courseId).findPage(pageId).access = access
  })

  api.withQuery(GET_COURSE_PERMISSION, async ({ id }) => {
    await delay(500)
    return {
      permission: courses.findCourse(id).permission
    }
  })
}

export function reloadCourses() {
  courses = new MockCourses()
}