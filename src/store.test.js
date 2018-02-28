import { actions, store } from './store'

jest.mock('./firebase', () => ({
  getSlides: jest.fn().mockReturnValue({ markdown: 'test' })
}))
const firebase = require('./firebase')

describe('store', () => {
  it('loadMarkdown', async () => {
    const value = await actions(store).loadMarkdown(null, 1)
    expect(firebase.getSlides).toBeCalledWith(1)
    expect(value).toEqual({ isLoading: false, markdown: 'test' })
  })

  it('setMarkdown', () => {
    const value = actions(store).setMarkdown(null, 'Testing setMarkdown')
    expect(global.localStorage.setItem).toBeCalledWith(
      'markdown',
      'Testing setMarkdown'
    )
    expect(value).toEqual({ markdown: 'Testing setMarkdown' })
  })
})
