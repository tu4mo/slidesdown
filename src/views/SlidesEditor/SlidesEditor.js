import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'unistore/react'
import SplitPane from 'react-split-pane'

import {
  getSlides,
  saveSlides,
  updateSlidesThrottled /* , saveImage */
} from '../../firebase'
import { actions } from '../../store'
import styledTheme from '../../theme'

import Editor from '../../components/Editor'
import Loadable from '../../components/Loadable'
import Slides from '../../components/Slides'
import Spinner from '../../components/Spinner'
import WindowResizeObserver from '../../components/WindowResizeObserver'

import SlidesToolBar from './SlidesToolBar'
import { StyledSidebar, StyledSlidesContainer } from './SlidesEditor.style'

const ShareDialog = Loadable(() => import('./ShareDialog'))

const DEFAULT_MARKDOWN =
  '# ✨✨✨\n\n# Welcome to Slidesdown\n\n---\n\n' +
  "## What is it?\n\nWith Slidesdown, you can write [markdown](https://en.wikipedia.org/wiki/Markdown) to create a **slideshow**.\n\n### Other features\n\n- No login required\n- Saves slides to your browser's localStorage\n- Code syntax highlighting\n- Sharing slides with unique URL\n\n---\n\n" +
  '## How to get stared\n\n1. Start typing markdown on the editor\n2. Enjoy the realtime preview of slides\n3. Click *Presentation* to view them as a slideshow\n4. Share your slides!\n\n---\n\n' +
  "## Some of the features\n\nCode syntax highlighting:\n```javascript\nconst hello = 'world'\nconsole.log(hello)\n```\n\nText formatting:\n\n- *Italic text*\n- **Bold text**\n- ~~Strikethrough text~~\n\n---\n\n" +
  '## Also tables\n\nColumn 1 | Column 2 | Column 3\n--- | --- | ---\nCell 1 | Cell 2 | Cell 3\n\n---\n\n' +
  '# 👋\n\n# Have fun!'

class SlidesEditor extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    theme: PropTypes.string.isRequired
  }

  state = {
    cursorPosition: 0,
    isCreated: false,
    isLoading: true,
    isSharing: false,
    isUploading: false,
    markdown: '',
    slideToFocus: 0,
    uploadProgress: 0
  }

  async componentDidMount() {
    const { match } = this.props
    const { slidesId } = match.params

    try {
      const slides = await getSlides(slidesId)
      this.setState({
        isCreated: true,
        isLoading: false,
        markdown: slides.markdown
      })
    } catch (err) {
      this.setState({ isLoading: false, markdown: DEFAULT_MARKDOWN })
    }
  }

  handleEditorChange = e => {
    const { match, theme } = this.props
    const { slidesId } = match.params
    const { isCreated } = this.state

    this.setState({ markdown: e.target.value }, () => {
      if (!isCreated) {
        this.setState({ isCreated: true }, () => {
          saveSlides({
            id: slidesId,
            markdown: this.state.markdown,
            theme
          })
        })
      } else {
        updateSlidesThrottled({
          id: slidesId,
          markdown: this.state.markdown,
          theme
        })
      }
    })
  }

  handleEditorDrop = async file => {
    // Disable for now
    // const { newId, setError } = this.props
    //
    // this.setState({ isUploading: true })
    //
    // saveImage({
    //   id: newId,
    //   file,
    //   onChange: uploadProgress => this.setState({ uploadProgress }),
    //   onError: () => {
    //     setError('Unable to save image')
    //     this.setState({ isUploading: false })
    //   },
    //   onDone: snapshot => {
    //     const { markdown, setMarkdown } = this.props
    //     const { cursorPosition } = this.state
    //
    //     this.setState({ isUploading: false })
    //
    //     setMarkdown(
    //       `${markdown.slice(0, cursorPosition)}` +
    //         `![](${snapshot.downloadURL})` +
    //         `${markdown.slice(cursorPosition)}`
    //     )
    //   }
    // })
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
    const {
      isLoading,
      isSharing,
      isUploading,
      markdown,
      slideToFocus,
      uploadProgress
    } = this.state

    const { history, theme } = this.props

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
                  isLoading={isUploading}
                  onChange={this.handleEditorChange}
                  onCursorPositionChange={this.handleEditorCursorPositionChange}
                  onDrop={this.handleEditorDrop}
                  progress={uploadProgress}
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
                <SlidesToolBar
                  onPresentationClick={this.handlePresentationClick}
                  onShareClick={this.handleShareClick}
                />
              </StyledSlidesContainer>
            </SplitPane>
            {isSharing && (
              <ShareDialog history={history} onClose={this.handleClose} />
            )}
          </Fragment>
        )}
      </WindowResizeObserver>
    )
  }
}

export default connect(
  'theme',
  actions
)(SlidesEditor)
