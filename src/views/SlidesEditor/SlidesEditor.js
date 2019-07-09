import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SplitPane from 'react-split-pane'
import queryString from 'query-string'
import uuid from 'uuid/v4'

import {
  createSlides,
  getSlides,
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

const SlidesEditor = ({ history, location, match }) => {
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isCreated, setIsCreated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [markdown, setMarkdown] = useState('')
  const [presentationId, setPresentationId] = useState(uuid())
  const [theme, setTheme] = useState('')
  const [slideToFocus, setSlideToFocus] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    setTheme(queryString.parse(location.search).theme || 'default')

    const fetchSlides = async () => {
      try {
        const slides = await getSlides(match.params.slidesId)
        setIsCreated(true)
        setIsLoading(false)
        setMarkdown(slides.markdown)
        setPresentationId(slides.presentationId)
      } catch (err) {
        setIsLoading(false)
        setMarkdown(DEFAULT_MARKDOWN)
      }
    }

    fetchSlides()
  }, [location.search, match.params.slidesId])

  const saveSlides = async () => {
    const { slidesId } = match.params

    setIsSaving(true)

    if (!isCreated) {
      setIsCreated(true)

      await createSlides({
        id: slidesId,
        markdown,
        presentationId,
        theme
      })

      setIsSaving(false)

      return
    }

    await updateSlidesThrottled({
      id: slidesId,
      markdown,
      theme,
      callback: () => setIsSaving(false)
    })
  }

  const handleEditorChange = e => {
    setMarkdown(e.target.value)
    saveSlides()
  }

  const handleEditorDrop = async file => {
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

  const handleEditorCursorPositionChange = ({ cursorPosition, slide }) => {
    setCursorPosition(cursorPosition)
    setSlideToFocus(slide)
  }

  const handlePresentationClick = async () => {
    await saveSlides()
    history.push(`/${presentationId}`)
  }

  const handleSplitPaneChange = () => {
    window.dispatchEvent(new Event('resize'))
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <WindowResizeObserver>
      {({ width }) => (
        <SplitPane
          defaultSize={300}
          onChange={handleSplitPaneChange}
          split={
            width > parseInt(styledTheme.breakpoints.md, 10)
              ? 'vertical'
              : 'horizontal'
          }
        >
          <StyledSidebar>
            <Editor
              isLoading={isUploading}
              onChange={handleEditorChange}
              onCursorPositionChange={handleEditorCursorPositionChange}
              onDrop={handleEditorDrop}
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
              isSaving={isSaving}
              onPresentationClick={handlePresentationClick}
              presentationId={presentationId}
            />
          </StyledSlidesContainer>
        </SplitPane>
      )}
    </WindowResizeObserver>
  )
}

SlidesEditor.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default SlidesEditor
