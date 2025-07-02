import { Spinner } from '.'
import { render } from '@testing-library/react'

it('renders correctly', () => {
  const { asFragment } = render(<Spinner />)

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="sc-bRKDuR ctSWrx"
      />
    </DocumentFragment>
  `)
})
