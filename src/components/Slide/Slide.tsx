import { ElementType, forwardRef, memo } from 'react'
import Markdown from 'react-markdown'
import gfm from 'remark-gfm'

import { StyledTransformContainer, StyledSlideContainer } from './Slide.style'

import Code from './renderers/Code'
import Image from './renderers/Image'
import Table from './renderers/Table'
import TableCell from './renderers/TableCell'

const renderers: { [nodeType: string]: ElementType } = {
  code: ({ node, ...props }) => <Code {...props} />,
  image: ({ node, ...props }) => <Image {...props} />,
  table: ({ node, ...props }) => <Table {...props} />,
  tableCell: ({ node, ...props }) => <TableCell {...props} />,
}

interface SlideProps {
  height: number
  scale: number
  single?: boolean
  markdown: string
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
          <Markdown plugins={[gfm]} renderers={renderers}>
            {markdown}
          </Markdown>
        </div>
      </StyledSlideContainer>
    </StyledTransformContainer>
  ))
)

export default Slide
