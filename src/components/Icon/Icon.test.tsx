import renderer from 'react-test-renderer'

import { Icon } from '.'
import { ReactNode } from 'react'

vi.mock('@tippy.js/react', async () => {
  return {
    default: ({ children }: { children: ReactNode }) => <>{children}</>,
  }
})

it('renders correctly', () => {
  const tree = renderer.create(<Icon type="presentation" />).toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <button
      className="sc-CgPeM bEOWvL"
      disabled={false}
    >
      <img
        className="sc-bQesnH gqHeSB"
        src="/src/components/Icon/svg/presentation.svg"
      />
    </button>
  `)
})

it('renders correctly with tooltip', () => {
  const tree = renderer
    .create(
      <Icon
        tooltip="Test"
        type="share"
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <button
      className="sc-CgPeM bEOWvL"
      disabled={false}
    >
      <img
        className="sc-bQesnH gqHeSB"
        src="/src/components/Icon/svg/share.svg"
      />
    </button>
  `)
})
