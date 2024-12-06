import { ButtonGroup } from '.'
import { render } from '@testing-library/react'

it('renders correctly', () => {
  const { asFragment } = render(<ButtonGroup>Test</ButtonGroup>)

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="sc-blHHSb jPqcIs"
      >
        Test
      </div>
    </DocumentFragment>
  `)
})
