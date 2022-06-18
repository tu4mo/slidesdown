import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import Button from './Button'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Button onClick={() => {}}>Test</Button>
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <button
      className="c0"
      onClick={[Function]}
    >
      Test
    </button>
  `)
})
