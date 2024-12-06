import { render } from '@testing-library/react'

import { Logo } from '.'

it('renders correctly', () => {
  const { asFragment } = render(<Logo />)

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <img
        alt="Slidesdown"
        class="sc-blHHSb irXyoh"
        src="/src/components/Logo/logo.svg"
      />
    </DocumentFragment>
  `)
})
