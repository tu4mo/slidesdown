import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Icon from '../Icon'

jest.mock('@tippy.js/react', () => 'Tooltip')

it('renders correctly', () => {
  const tree = renderer.create(<Icon type="presentation" />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('renders correctly with tooltip', () => {
  const tree = renderer.create(<Icon tooltip="Test" type="share" />).toJSON()

  expect(tree).toMatchSnapshot()
})
