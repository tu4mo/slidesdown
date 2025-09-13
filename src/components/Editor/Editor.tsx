import { CSSProperties, useRef } from 'react'

import styles from './Editor.module.css'

import {
  getCurrentLineNumber,
  getSlidesFirstLines,
  getCurrentSlide,
} from './utils'

type Props = {
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

function Editor({
  isLoading,
  onChange,
  onCursorPositionChange,
  onDrop,
  progress,
  value,
}: Props) {
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
    <div className={styles.wrapper}>
      <textarea
        className={styles.textarea}
        aria-label="Markdown"
        disabled={isLoading}
        name="markdown"
        onChange={onChange}
        onClick={handleClickAndKeyUp}
        onDrop={handleDrop}
        onKeyUp={handleClickAndKeyUp}
        placeholder="Write markdown here"
        ref={editorRef}
        value={value}
      />
      {isLoading && (
        <div style={{ '--progress': `${progress || 0}%` } as CSSProperties} />
      )}
    </div>
  )
}

export { Editor }
