import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import Spinner from './Spinner'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Spinner />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="c0"
    />
  `)
})
