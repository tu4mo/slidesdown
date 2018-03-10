import {
  getCurrentLineNumber,
  getSlidesFirstLines,
  getCurrentSlide
} from './utils'

it('getCurrentLineNumber', () => {
  const value = 'abc\ndef\nghi\n'
  expect(getCurrentLineNumber(value, 4)).toBe(2)
})

it('getSlidesFirstLines', () => {
  const value = 'abc\n---\ndef\n---\nghi\n'
  expect(getSlidesFirstLines(value)).toEqual([
    { slide: 0, firstLine: 0 },
    { slide: 1, firstLine: 2 },
    { slide: 2, firstLine: 4 }
  ])
  expect(getSlidesFirstLines()).toEqual([{ slide: 0, firstLine: 0 }])
})

it('getCurrentSlide', () => {
  const slides = [
    { slide: 0, firstLine: 0 },
    { slide: 1, firstLine: 10 },
    { slide: 2, firstLine: 20 }
  ]

  const value0 = getCurrentSlide(slides, 0)
  expect(value0).toBe(0)

  const value1 = getCurrentSlide(slides, 10)
  expect(value1).toBe(0)

  const value2 = getCurrentSlide(slides, 16)
  expect(value2).toBe(1)
})
