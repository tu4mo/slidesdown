import { Notification } from '.'
import { render } from '@testing-library/react'

it('renders correctly', () => {
  const { asFragment } = render(<Notification>Test</Notification>)

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="sc-blHHSb kZZaZY"
      >
        Test
      </div>
    </DocumentFragment>
  `)
})
