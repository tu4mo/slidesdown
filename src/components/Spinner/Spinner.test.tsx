import { ThemeProvider } from 'styled-components'

import { theme } from '../../theme'
import { Spinner } from '.'
import { render } from '@testing-library/react'

it('renders correctly', () => {
  const { asFragment } = render(
    <ThemeProvider theme={theme}>
      <Spinner />
    </ThemeProvider>,
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="sc-blHHSb fPkpAo"
      />
    </DocumentFragment>
  `)
})
