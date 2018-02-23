import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Logo from './Logo'

jest.mock('./logo.svg', () => 'Logo');

it('renders correctly', () => {
  const tree = renderer.create(<Logo />).toJSON()

  expect(tree).toMatchSnapshot()
})
