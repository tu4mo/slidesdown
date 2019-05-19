import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import Notification from './Notification'

jest.useFakeTimers()

const component = renderer.create(
  <ThemeProvider theme={theme}>
    <Notification>Test</Notification>
  </ThemeProvider>
)

it('renders correctly', () => {
  expect(component.toJSON()).toMatchSnapshot()
})

// Disabled until there's a way to test useEffect
// it('renders nothing after time has passed', () => {
//   jest.runAllTimers()
//   expect(setTimeout).toHaveBeenCalledTimes(1)
//   expect(component.toJSON()).toMatchSnapshot()
// })
