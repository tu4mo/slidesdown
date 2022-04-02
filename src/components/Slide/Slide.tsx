import { ComponentProps, forwardRef, memo } from 'react'
import Markdown from 'react-markdown'
import gfm from 'remark-gfm'

import { StyledTransformContainer, StyledSlideContainer } from './Slide.style'

import Code from './renderers/Code'
import Image from './renderers/Image'
import Table from './renderers/Table'
import TableCell from './renderers/TableCell'

const components: ComponentProps<typeof Markdown>['components'] = {
  code: ({ node, ...props }) => <Code {...props} />,
  img: ({ node, ...props }) => <Image {...props} />,
  table: ({ node, ...props }) => <Table {...props} />,
  th: ({ node, ...props }) => <TableCell {...props} />,
  td: ({ node, ...props }) => <TableCell {...props} />,
}

interface SlideProps {
  height: number
  scale: number
  single?: boolean
  markdown: string
  width: number
}

const Slide = memo(
  forwardRef<HTMLDivElement, SlideProps>(
    ({ markdown, scale, single, width, height }, ref) => (
      <StyledTransformContainer
        ref={ref}
        style={{ height, width }}
      >
        <StyledSlideContainer
          className="slide"
          single={single}
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <div>
            <Markdown
              remarkPlugins={[gfm]}
              components={components}
            >
              {markdown}
            </Markdown>
          </div>
        </StyledSlideContainer>
      </StyledTransformContainer>
    )
  )
)

export default Slide
