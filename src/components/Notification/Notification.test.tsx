import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../theme'
import { Notification } from '.'

jest.useFakeTimers()

const component = renderer.create(
  <ThemeProvider theme={theme}>
    <Notification>Test</Notification>
  </ThemeProvider>
)

it('renders correctly', () => {
  expect(component.toJSON()).toMatchInlineSnapshot(`
    <div
      className="cYPiUr"
    >
      Test
    </div>
  `)
})

// it('renders nothing after time has passed', () => {
//   jest.runAllTimers()
//   expect(setTimeout).toHaveBeenCalledTimes(1)
//   expect(component.toJSON()).toMatchInlineSnapshot(`
//     <div
//       className="lcvhlL"
//     >
//       Test
//     </div>
//   `)
// })
