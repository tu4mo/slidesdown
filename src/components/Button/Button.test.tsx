import { Button } from '.'
import { render } from '@testing-library/react'

it('renders correctly', () => {
  const { asFragment } = render(<Button onClick={() => {}}>Test</Button>)

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="sc-bRKDuR cRdAAr"
      >
        Test
      </button>
    </DocumentFragment>
  `)
})
