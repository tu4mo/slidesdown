import { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'

const getWidth = () => window.innerWidth

class WindowResizeObserver extends Component {
  static propTypes = {
    children: PropTypes.func,
    onResize: PropTypes.func
  }

  state = {
    width: getWidth()
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = throttle(() => {
    const { onResize } = this.props

    this.setState({
      width: getWidth()
    })

    onResize && onResize()
  }, 100)

  render() {
    const { children } = this.props
    const { width } = this.state

    return children ? children({ width }) : null
  }
}

export default WindowResizeObserver
