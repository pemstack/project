import { parseProps } from './parse-props'

describe('parseProps', () => {
  test('with props', () => {
    const [props, str] = parseProps(' <color: green; numbers: 1, 2, 3; flag; x:abc> Hello world! ')
    expect(str).toBe('Hello world!')
    expect(props).toEqual({
      color: 'green',
      numbers: ['1', '2', '3'],
      flag: true,
      x: 'abc'
    })
  })

  test('with single flag', () => {
    const [props, str] = parseProps('<answer> 42!')
    expect(str).toBe('42!')
    expect(props).toEqual({ answer: true })
  })

  test('plain string', () => {
    const [props, str] = parseProps(' hello; <world>! ')
    expect(str).toBe('hello; <world>!')
    expect(props).toEqual({})
  })
})
