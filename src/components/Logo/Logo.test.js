import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import Logo from './Logo'

jest.mock('./logo.svg', () => 'Logo')

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Logo />
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
