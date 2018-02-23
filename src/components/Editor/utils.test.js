import { getCurrentLineNumber } from './utils'

it('getCurrentLineNumber', () => {
  const value = 'abc\ndef\nghi\n'
  expect(getCurrentLineNumber(value, 4)).toBe(2)
})
