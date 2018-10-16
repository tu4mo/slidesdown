import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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

class Slide extends PureComponent {
  static propTypes = {
    height: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
    single: PropTypes.bool,
    markdown: PropTypes.string,
    width: PropTypes.number.isRequired
  }

  render() {
    const { markdown, scale, single, width, height } = this.props

    return (
      <StyledTransformContainer style={{ height: height, width: width }}>
        <StyledSlideContainer
          single={single}
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <div>
            <Markdown renderers={renderers} source={markdown} />
          </div>
        </StyledSlideContainer>
      </StyledTransformContainer>
    )
  }
}

export default Slide
