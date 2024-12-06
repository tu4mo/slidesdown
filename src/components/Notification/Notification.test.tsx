import { ThemeProvider } from 'styled-components'

import { theme } from '../../theme'
import { Notification } from '.'
import { render } from '@testing-library/react'

it('renders correctly', () => {
  const { asFragment } = render(
    <ThemeProvider theme={theme}>
      <Notification>Test</Notification>
    </ThemeProvider>,
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="sc-blHHSb kZZaZY"
      >
        Test
      </div>
    </DocumentFragment>
  `)
})
