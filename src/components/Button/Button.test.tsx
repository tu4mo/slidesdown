import { ThemeProvider } from 'styled-components'

import { theme } from '../../theme'
import { Button } from '.'
import { render } from '@testing-library/react'

it('renders correctly', () => {
  const { asFragment } = render(
    <ThemeProvider theme={theme}>
      <Button onClick={() => {}}>Test</Button>
    </ThemeProvider>,
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="sc-blHHSb fnnvxy"
      >
        Test
      </button>
    </DocumentFragment>
  `)
})
