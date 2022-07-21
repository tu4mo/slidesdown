import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../theme'
import { Logo } from '.'

jest.mock('./logo.svg', () => 'Logo')

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Logo />
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <img
      alt="Slidesdown"
      className="c0"
      src="Logo"
    />
  `)
})
