import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import Button from './Button'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Button onClick={() => {}}>Test</Button>
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
