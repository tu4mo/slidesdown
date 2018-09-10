import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import SplitPane from 'react-split-pane'
import queryString from 'query-string'
import uuid from 'uuid/v4'

import {
  getSlides,
  saveSlides,
  updateSlidesThrottled
  // , saveImage
} from '../../firebase'
import styledTheme from '../../theme'

import Editor from '../../components/Editor'
import Slides from '../../components/Slides'
import Spinner from '../../components/Spinner'
import WindowResizeObserver from '../../components/WindowResizeObserver'

import SlidesToolBar from './SlidesToolBar'
import { StyledSidebar, StyledSlidesContainer } from './SlidesEditor.style'

const DEFAULT_MARKDOWN =
  '# ✨✨✨\n\n# Welcome to Slidesdown\n\n---\n\n' +
  '## What is it?\n\nWith Slidesdown, you can write [markdown](https://en.wikipedia.org/wiki/Markdown) to create a **slideshow**.\n\n### Other features\n\n- No login required\n- Auto-save to cloud\n- Code syntax highlighting\n- Sharing presentation with a unique URL\n- Slides will be removed after ~30 days of inactivity (edits/presentations)\n\n---\n\n' +
  "## How to get stared\n\n1. Check the address bar, that's your slides' secret editing URL\n2. Start typing markdown on the editor, enjoy the realtime preview of slides\n3. Click *Presentation* to open the slideshow URL\n4. Share presentation URL for read-only access to your slides\n\n---\n\n" +
  "## Some of the features\n\nCode syntax highlighting:\n```javascript\nconst hello = 'world'\nconsole.log(hello)\n```\n\nText formatting:\n\n- *Italic text*\n- **Bold text**\n- ~~Strikethrough text~~\n\n---\n\n" +
  '## Also tables\n\nColumn 1 | Column 2 | Column 3\n--- | --- | ---\nCell 1 | Cell 2 | Cell 3\n\n---\n\n' +
  '# 👋\n\n# Have fun!'

class SlidesEditor extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    cursorPosition: 0,
    isCreated: false,
    isLoading: true,
    isUploading: false,
    markdown: '',
    presentationId: uuid(),
    theme: '',
    slideToFocus: 0,
    uploadProgress: 0
  }

  async componentDidMount() {
    const { location, match } = this.props
    const { slidesId } = match.params

    this.setState({
      theme: queryString.parse(location.search).theme || 'default'
    })

    try {
      const slides = await getSlides(slidesId)
      this.setState({
        isCreated: true,
        isLoading: false,
        markdown: slides.markdown,
        presentationId: slides.presentationId
      })
    } catch (err) {
      this.setState({ isLoading: false, markdown: DEFAULT_MARKDOWN })
    }
  }

  handleEditorChange = e => {
    const { match } = this.props
    const { slidesId } = match.params
    const { isCreated, presentationId, theme } = this.state

    this.setState({ markdown: e.target.value }, () => {
      if (!isCreated) {
        this.setState({ isCreated: true })

        saveSlides({
          id: slidesId,
          markdown: this.state.markdown,
          presentationId,
          theme
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

  handleSplitPaneChange = () => {
    window.dispatchEvent(new Event('resize'))
  }

  render() {
    const {
      isLoading,
      isUploading,
      markdown,
      presentationId,
      slideToFocus,
      theme,
      uploadProgress
    } = this.state

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
                  onShareClick={this.handleShareClick}
                  presentationId={presentationId}
                />
              </StyledSlidesContainer>
            </SplitPane>
          </Fragment>
        )}
      </WindowResizeObserver>
    )
  }
}

export default SlidesEditor
