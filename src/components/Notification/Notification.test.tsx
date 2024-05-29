import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../theme'
import { Notification } from '.'

const component = renderer.create(
  <ThemeProvider theme={theme}>
    <Notification>Test</Notification>
  </ThemeProvider>
)

it('renders correctly', () => {
  expect(component.toJSON()).toMatchInlineSnapshot(`
    <div
      className="sc-CgPeM drytiR"
    >
      Test
    </div>
  `)
})
