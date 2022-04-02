import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import Editor from '../Editor'

it('renders correctly', () => {
  const onChangeMock = jest.fn()

  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Editor
          onChange={onChangeMock}
          value="Test"
        />
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="c0"
    >
      <textarea
        aria-label="Markdown"
        className="c1"
        onChange={[MockFunction]}
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
  const onChangeMock = jest.fn()

  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Editor
          isLoading
          onChange={onChangeMock}
          progress={50}
          value="Test"
        />
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="c0"
    >
      <textarea
        aria-label="Markdown"
        className="c1"
        disabled={true}
        onChange={[MockFunction]}
        onClick={[Function]}
        onDrop={[Function]}
        onKeyUp={[Function]}
        placeholder="Write markdown here"
        value="Test"
      />
      <div
        className="c2"
      />
    </div>
  `)
})
