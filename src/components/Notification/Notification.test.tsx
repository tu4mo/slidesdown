import { Notification } from '.'
import { render } from '@testing-library/react'

it('renders correctly', () => {
  const { asFragment } = render(<Notification>Test</Notification>)

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="_notification_0d0095"
      >
        Test
      </div>
    </DocumentFragment>
  `)
})
