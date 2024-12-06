import { Icon } from '.'
import { ReactNode } from 'react'
import { render } from '@testing-library/react'

vi.mock('@tippy.js/react', async () => {
  return {
    default: ({ children }: { children: ReactNode }) => <>{children}</>,
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<Icon type="presentation" />)

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="sc-blHHSb evDhHP"
      >
        <img
          class="sc-gtLWhw iqsKKO"
          src="/src/components/Icon/svg/presentation.svg"
        />
      </button>
    </DocumentFragment>
  `)
})

it('renders correctly with tooltip', () => {
  const { asFragment } = render(
    <Icon
      tooltip="Test"
      type="share"
    />,
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="sc-blHHSb evDhHP"
      >
        <img
          class="sc-gtLWhw iqsKKO"
          src="/src/components/Icon/svg/share.svg"
        />
      </button>
    </DocumentFragment>
  `)
})
