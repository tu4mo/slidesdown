import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import Editor from '../Editor'

it('renders correctly', () => {
  const onChangeMock = jest.fn()

  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Editor onChange={onChangeMock} value="Test" />
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
