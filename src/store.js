import createStore from 'unistore'
import throttle from 'lodash.throttle'

import { getSlides } from './firebase'

const defaultMarkdown =
  '# Welcome to *Slidesdown*\n\n---\n\n' +
  '✨ Write markdown, get slides! ✨\n\n---\n\n' +
  '## A list!\n\n- Awesome\n\n1. Yeah!'

export const store = createStore({
  isLoading: false,
  markdown: window.localStorage.getItem('markdown') || defaultMarkdown
})

export const actions = store => ({
  async loadMarkdown(state, id) {
    try {
      store.setState({ isLoading: true })
      const slides = await getSlides(id)
      return { isLoading: false, markdown: slides.markdown }
    } catch (err) {
      throw err
    }
  },

  setMarkdown(state, markdown) {
    setLocalStorageItem(markdown)
    return { markdown }
  }
})

const setLocalStorageItem = throttle(
  value => window.localStorage.setItem('markdown', value),
  1000
)
