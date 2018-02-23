import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import ButtonGroup from './ButtonGroup'

it('renders correctly', () => {
  const tree = renderer.create(<ButtonGroup>Test</ButtonGroup>).toJSON()

  expect(tree).toMatchSnapshot()
})
