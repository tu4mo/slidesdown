import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../theme'
import { Button } from '.'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Button onClick={() => {}}>Test</Button>
      </ThemeProvider>,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <button
      className="sc-CgPeM jWFTZe"
      onClick={[Function]}
    >
      Test
    </button>
  `)
})
