import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../theme'
import { Editor } from '.'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Editor
          onChange={() => {}}
          value="Test"
        />
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="sc-CgPeM bOzJlu"
    >
      <textarea
        aria-label="Markdown"
        className="sc-bQesnH hFbfqQ"
        onChange={[Function]}
        onClick={[Function]}
        onDrop={[Function]}
        onKeyUp={[Function]}
        placeholder="Write markdown here"
        value="Test"
      />
    </div>
  `)
})

it('renders correctly with disabled and isLoading', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Editor
          isLoading
          onChange={() => {}}
          progress={50}
          value="Test"
        />
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="sc-CgPeM bOzJlu"
    >
      <textarea
        aria-label="Markdown"
        className="sc-bQesnH hFbfqQ"
        disabled={true}
        onChange={[Function]}
        onClick={[Function]}
        onDrop={[Function]}
        onKeyUp={[Function]}
        placeholder="Write markdown here"
        value="Test"
      />
      <div
        className="sc-izzqae fwihUx"
      />
    </div>
  `)
})
