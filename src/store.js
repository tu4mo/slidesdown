import createStore from 'unistore'
import queryString from 'query-string'

const getThemeFromUrl = () => queryString.parse(window.location.search).theme

export const store = createStore({
  error: '',
  theme: getThemeFromUrl() || 'default'
})

export const actions = store => ({
  setError(state, error) {
    return { error }
  }
})
