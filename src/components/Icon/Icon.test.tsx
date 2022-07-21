import renderer from 'react-test-renderer'

import { Icon } from '.'

jest.mock('@tippy.js/react', () => 'Tooltip')

it('renders correctly', () => {
  const tree = renderer.create(<Icon type="presentation" />).toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <button
      className="c0"
      disabled={false}
    >
      <img
        className="c1"
        src="presentation.svg"
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
      />
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <Tooltip
      arrow={true}
      content="Test"
    >
      <button
        className="c0"
        disabled={false}
      >
        <img
          className="c1"
          src="share.svg"
        />
      </button>
    </Tooltip>
  `)
})
