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
        class="sc-blHHSb huuqUm"
      >
        <textarea
          aria-label="Markdown"
          class="sc-gtLWhw fTZlYX"
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
        class="sc-blHHSb huuqUm"
      >
        <textarea
          aria-label="Markdown"
          class="sc-gtLWhw fTZlYX"
          disabled=""
          placeholder="Write markdown here"
        >
          Test
        </textarea>
        <div
          class="sc-egkSDF bFHuzk"
        />
      </div>
    </DocumentFragment>
  `)
})
