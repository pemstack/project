import { MockApi, delay } from 'app/mock'
import { GET_COURSE_PAGES, GET_COURSE_PAGE, GET_COURSE_ACCESS, GET_COURSES, CourseAccessLevel } from 'api/courses.api'

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

function mockCourseList(api: MockApi) {
  api.withQuery(GET_COURSES, async () => {
    await delay(1000)
    return [
      { id: '123456', title: 'Siguria e te dhenave', access: CourseAccessLevel.Read, owner: false },
      { id: '234567', title: 'Sinjale', access: CourseAccessLevel.Read, owner: false },
      { id: '345678', title: 'Interneti', access: CourseAccessLevel.Read, owner: false },
      { id: '456789', title: 'Programimi ne internet', access: CourseAccessLevel.Read, owner: false },
      { id: '567890', title: 'OOP', access: CourseAccessLevel.Read, owner: false }
    ]
  })
}

function mockCoursePages(api: MockApi) {
  api.withQuery(GET_COURSE_PAGES, async ({ id }) => {
    await delay(1000)
    switch (id) {
      case 'siguria':
        return [
          { id: 'info', title: 'Info', isPublic: true },
          { id: 'assignments', title: 'Assignments', isPublic: false },
          { id: 'newsfeed', title: 'Newsfeed', isPublic: true }
        ]
      default:
        throw new Error('Course does not exist.')
    }
  })
}

function mockCoursePage(api: MockApi) {
  api.withQuery(GET_COURSE_PAGE, async ({ courseId, pageId }) => {
    await delay(1000)
    switch (courseId) {
      case 'siguria':
        switch (pageId) {
          case 'info':
            return {
              pageId,
              courseId,
              title: 'Info',
              content: longMarkdown,
              isPublic: true
            }
          case 'assignments':
            return {
              pageId,
              courseId,
              title: 'Info',
              content: 'Assignments page content...',
              isPublic: false
            }
          case 'newsfeed':
            return {
              pageId,
              courseId,
              title: 'Newsfeed',
              content: '',
              isPublic: true
            }
          default:
            throw new Error('Page does not exist.')
        }
      default:
        throw new Error('Course does not exist.')
    }
  })
}

function mockCourseAccess(api: MockApi) {
  api.withQuery(GET_COURSE_ACCESS, async ({ id }) => {
    switch (id) {
      case 'siguria':
        return { accessLevel: 'write' }
      default:
        throw new Error('Course does not exist.')
    }
  })
}

export function mockCourses(api: MockApi) {
  mockCourseList(api)
  mockCoursePages(api)
  mockCoursePage(api)
  mockCourseAccess(api)
}
