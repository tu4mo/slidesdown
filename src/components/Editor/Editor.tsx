import { useRef } from 'react'

import {
  StyledWrapper,
  StyledTextarea,
  StyledProgressBar,
} from './Editor.style'

import {
  getCurrentLineNumber,
  getSlidesFirstLines,
  getCurrentSlide,
} from './utils'

interface Props {
  isLoading?: boolean
  onChange: React.HTMLProps<HTMLTextAreaElement>['onChange']
  onCursorPositionChange?({
    cursorPosition,
    slide,
  }: {
    cursorPosition: number
    slide: number
  }): void
  onDrop?(file: File): void
  progress?: number
  value: string
}

const Editor = ({
  isLoading,
  onChange,
  onCursorPositionChange,
  onDrop,
  progress,
  value,
}: Props) => {
  const editorRef = useRef<HTMLTextAreaElement>(null)

  const getCurrentCursorPosition = (): number =>
    editorRef.current?.selectionStart ?? 0

  const handleClickAndKeyUp = () => {
    const cursorPosition = getCurrentCursorPosition()
    const currentLineNumber = getCurrentLineNumber(value, cursorPosition)
    const slides = getSlidesFirstLines(value)
    const slide = getCurrentSlide(slides, currentLineNumber)

    onCursorPositionChange?.({
      cursorPosition,
      slide,
    })
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    onDrop?.(event.dataTransfer.files[0])
  }

  return (
    <StyledWrapper>
      <StyledTextarea
        aria-label="Markdown"
        disabled={isLoading}
        onChange={onChange}
        onClick={handleClickAndKeyUp}
        onDrop={handleDrop}
        onKeyUp={handleClickAndKeyUp}
        placeholder="Write markdown here"
        ref={editorRef}
        value={value}
      />
      {isLoading && <StyledProgressBar progress={progress || 0} />}
    </StyledWrapper>
  )
}

export { Editor }
