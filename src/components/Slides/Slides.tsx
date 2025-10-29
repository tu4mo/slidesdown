import { useCallback, useEffect, useRef, useState } from 'react'
import { useWindowResizeObserver } from '../../hooks/useWindowResizeObserver'
import { Slide } from '../Slide'
import styles from './Slides.module.css'

function splitMarkdownToSlides(markdown: string = '') {
  return markdown.split('\n---\n')
}

interface SlidesProps {
  markdown?: string
  onSlidesCount?(count: number): void
  singleSlide?: number
  slideToFocus?: number
}

function Slides({
  markdown,
  onSlidesCount,
  singleSlide,
  slideToFocus,
}: SlidesProps) {
  const [height, setHeight] = useState(0)
  const [scale, setScale] = useState(1)
  const [width, setWidth] = useState(0)

  const slidesRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onSlidesCount?.(splitMarkdownToSlides(markdown).length)

    if (slidesRef.current && scrollToRef.current) {
      slidesRef.current.scrollTop = scrollToRef.current.offsetTop - 32
    }
  }, [markdown, onSlidesCount, slideToFocus])

  const handleResize = useCallback(() => {
    if (!slidesRef.current) {
      return
    }

    const computedStyle = window.getComputedStyle(slidesRef.current)

    const maxWidth =
      slidesRef.current.clientWidth -
      parseInt(computedStyle.paddingLeft || '', 10) -
      parseInt(computedStyle.paddingRight || '', 10)

    const maxHeight =
      slidesRef.current.clientHeight -
      parseInt(computedStyle.paddingBottom || '', 10) -
      parseInt(computedStyle.paddingTop || '', 10)

    let width = maxWidth
    let height = maxHeight

    const RATIO = 0.5625

    if (singleSlide === undefined || maxHeight > maxWidth * RATIO) {
      height = maxWidth * RATIO
    } else {
      width = maxHeight / RATIO
    }

    setHeight(height)
    setScale(Math.min(width / 800, height / 450))
    setWidth(width)
  }, [singleSlide])

  const slides = splitMarkdownToSlides(markdown).map(
    (slideMarkdown, slideIndex) => (
      <Slide
        height={height}
        key={slideMarkdown}
        markdown={slideMarkdown}
        ref={slideIndex === slideToFocus ? scrollToRef : null}
        scale={scale}
        single={singleSlide !== undefined}
        width={width}
      />
    ),
  )

  useWindowResizeObserver(handleResize)

  return singleSlide !== undefined ? (
    <div
      className={styles.singleSlideContainer}
      ref={slidesRef}
    >
      {slides[singleSlide]}
    </div>
  ) : (
    <div
      className={styles.slidesContainer}
      ref={slidesRef}
    >
      {slides}
    </div>
  )
}

export { Slides }
