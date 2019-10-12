import React, { forwardRef, memo } from 'react'
import Markdown from 'react-markdown'

import { StyledTransformContainer, StyledSlideContainer } from './Slide.style'

import Code from './renderers/Code'
import Image from './renderers/Image'
import Table from './renderers/Table'
import TableCell from './renderers/TableCell'

const renderers = {
  code: Code,
  image: Image,
  table: Table,
  tableCell: TableCell
}

interface SlideProps {
  height: number
  scale: number
  single?: boolean
  markdown?: string
  width: number
}

const Slide = memo(
  forwardRef(({ markdown, scale, single, width, height }: SlideProps, ref) => (
    <StyledTransformContainer ref={ref as any} style={{ height, width }}>
      <StyledSlideContainer
        className="slide"
        single={single}
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <div>
          <Markdown renderers={renderers} source={markdown} />
        </div>
      </StyledSlideContainer>
    </StyledTransformContainer>
  ))
)

export default Slide
