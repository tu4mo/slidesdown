import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'unistore/react'
import SplitPane from 'react-split-pane'

import { saveImage } from '../../firebase'
import { actions } from '../../store'
import styledTheme from '../../theme'

import Editor from '../../components/Editor'
// import Loadable from '../../components/Loadable'
import Modal from '../../components/Modal'
import Slides from '../../components/Slides'
import Spinner from '../../components/Spinner'
import WindowResizeObserver from '../../components/WindowResizeObserver'

import { StyledSidebar, StyledSlidesContainer } from './styles'

// TODO: Code-splitting ShareDialog seems to cause an issue with
//       styled-components after app is build with Parcel.
// const ShareDialog = Loadable(() => import('./ShareDialog'))
import ShareDialog from './ShareDialog'
import ToolBar from './ToolBar'

class SlidesEditor extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    markdown: PropTypes.string,
    match: PropTypes.object.isRequired,
    newId: PropTypes.string.isRequired,
    setMarkdown: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  }

  state = {
    cursorPosition: 0,
    isSharing: false,
    slideToFocus: 0
  }

  async componentDidMount() {
    const { history, loadMarkdown, match } = this.props
    const { slidesId } = match.params

    if (slidesId) {
      try {
        await loadMarkdown(slidesId)
      } catch (err) {
        console.error(err)
        history.push('/')
      }
    } else {
      this.setState({ isLoading: false })
    }
  }

  handleEditorChange = e => {
    const { history, match } = this.props
    const { slidesId } = match.params

    if (slidesId) {
      history.push('/')
    }

    this.props.setMarkdown(e.target.value)
  }

  handleEditorDrop = async file => {
    const { markdown, newId, setMarkdown } = this.props
    const { cursorPosition } = this.state

    const url = await saveImage({ id: newId, file })

    setMarkdown(
      `${markdown.slice(0, cursorPosition)}` +
        `![${file.name}](${url})` +
        `${markdown.slice(cursorPosition)}`
    )
  }

  handleEditorCursorPositionChange = ({ cursorPosition, slide }) =>
    this.setState({ cursorPosition, slideToFocus: slide })

  handlePresentationClick = e => {
    const { history, match } = this.props
    const { slidesId } = match.params

    history.push(`presentation${slidesId ? `/${match.params.slidesId}` : ''}`)
  }

  handleShareClick = e => {
    this.setState({ isSharing: true })
  }

  handleSplitPaneChange = () => {
    window.dispatchEvent(new Event('resize'))
  }

  handleClose = () => {
    this.setState({ isSharing: false })
  }

  render() {
    const { isSharing, slideToFocus } = this.state
    const { history, isLoading, markdown, theme } = this.props

    return isLoading ? (
      <Spinner />
    ) : (
      <WindowResizeObserver>
        {({ width }) => (
          <Fragment>
            <SplitPane
              defaultSize={300}
              onChange={this.handleSplitPaneChange}
              split={
                width > parseInt(styledTheme.breakpoints.md, 10)
                  ? 'vertical'
                  : 'horizontal'
              }
            >
              <StyledSidebar>
                <Editor
                  onChange={this.handleEditorChange}
                  onCursorPositionChange={this.handleEditorCursorPositionChange}
                  onDrop={this.handleEditorDrop}
                  value={markdown}
                />
              </StyledSidebar>
              <StyledSlidesContainer
                onDragOver={e => e.preventDefault()}
                onDrop={e => e.preventDefault()}
              >
                <Slides
                  markdown={markdown}
                  slideToFocus={slideToFocus}
                  theme={theme}
                />
                <ToolBar
                  onPresentationClick={this.handlePresentationClick}
                  onShareClick={this.handleShareClick}
                />
              </StyledSlidesContainer>
            </SplitPane>
            {isSharing && (
              <Modal onClose={this.handleClose}>
                <ShareDialog history={history} />
              </Modal>
            )}
          </Fragment>
        )}
      </WindowResizeObserver>
    )
  }
}

export default connect('isLoading, markdown, newId, theme', actions)(
  SlidesEditor
)
