import renderer from 'react-test-renderer'

import { ButtonGroup } from '.'

it('renders correctly', () => {
  const tree = renderer.create(<ButtonGroup>Test</ButtonGroup>).toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="c0"
    >
      Test
    </div>
  `)
})
