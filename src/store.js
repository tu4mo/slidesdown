import createStore from 'unistore'
import throttle from 'lodash.throttle'
import queryString from 'query-string'
import uuid from 'uuid/v4'

import { getSlides } from './firebase'

const defaultMarkdown =
  '# ✨✨✨\n\n# Welcome to Slidesdown\n\n---\n\n' +
  "## What is it?\n\nWith Slidesdown, you can write [markdown](https://en.wikipedia.org/wiki/Markdown) to create a **slideshow**.\n\n### Other features\n\n- No login required\n- Saves slides to your browser's localStorage\n- Code syntax highlighting\n- Sharing slides with unique URL\n\n---\n\n" +
  '## How to get stared\n\n1. Start typing markdown on the editor\n2. Enjoy the realtime preview of slides\n3. Click *Presentation* to view them as a slideshow\n4. Share your slides!\n\n---\n\n' +
  "## Some of the features\n\nCode syntax highlighting:\n```javascript\nconst hello = 'world'\nconsole.log(hello)\n```\n\nText formatting:\n\n- *Italic text*\n- **Bold text**\n- ~~Strikethrough text~~\n\n---\n\n" +
  '# 👋\n\n# Have fun!'

const getThemeFromUrl = () => queryString.parse(window.location.search).theme

export const store = createStore({
  error: '',
  isLoading: false,
  markdown: window.localStorage.getItem('markdown') || defaultMarkdown,
  newId: uuid(),
  theme: getThemeFromUrl() || 'default'
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
  },

  createNewId(state) {
    return { newId: uuid() }
  },

  setError(state, error) {
    return { error }
  }
})

const setLocalStorageItem = throttle(
  value => window.localStorage.setItem('markdown', value),
  1000
)
