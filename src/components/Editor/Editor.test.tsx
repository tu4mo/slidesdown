import { Editor } from '.'
import { render } from '@testing-library/react'

it('renders correctly', () => {
  const { asFragment } = render(
    <Editor
      onChange={() => {}}
      value="Test"
    />,
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="_wrapper_b9116a"
      >
        <textarea
          aria-label="Markdown"
          class="_textarea_b9116a"
          name="markdown"
          placeholder="Write markdown here"
        >
          Test
        </textarea>
      </div>
    </DocumentFragment>
  `)
})

it('renders correctly with disabled and isLoading', () => {
  const { asFragment } = render(
    <Editor
      isLoading
      onChange={() => {}}
      progress={50}
      value="Test"
    />,
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="_wrapper_b9116a"
      >
        <textarea
          aria-label="Markdown"
          class="_textarea_b9116a"
          disabled=""
          name="markdown"
          placeholder="Write markdown here"
        >
          Test
        </textarea>
        <div
          style="--progress: 50%;"
        />
      </div>
    </DocumentFragment>
  `)
})
