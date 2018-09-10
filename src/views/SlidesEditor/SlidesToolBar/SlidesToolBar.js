import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ButtonGroup from '../../../components/ButtonGroup'
import Icon from '../../../components/Icon'
import Loadable from '../../../components/Loadable'
import Logo from '../../../components/Logo'
import ToolBar from '../../../components/ToolBar'
import Tooltip from '../../../components/Tooltip'

import {
  StyledToolBarContainer,
  StyledLogoContainer
} from './SlidesToolBar.style'

const About = Loadable(() => import('./About'))

class SlidesToolBar extends Component {
  static propTypes = {
    presentationId: PropTypes.string.isRequired
  }

  state = {
    isAboutVisible: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.isAboutVisible !== nextState.isAboutVisible ||
      this.props.presentationId !== nextProps.presentationId
    )
  }

  render() {
    const { presentationId } = this.props
    const { isAboutVisible } = this.state

    return (
      <Fragment>
        <StyledToolBarContainer>
          <ToolBar>
            <StyledLogoContainer>
              <Tooltip html="About Slidesdown">
                <Logo onClick={() => this.setState({ isAboutVisible: true })} />
              </Tooltip>
            </StyledLogoContainer>
            <ButtonGroup>
              <Link to={`/${presentationId}`}>
                <Icon tooltip="Presentation" type="presentation" />
              </Link>
            </ButtonGroup>
          </ToolBar>
        </StyledToolBarContainer>
        {isAboutVisible && (
          <About onClose={() => this.setState({ isAboutVisible: false })} />
        )}
      </Fragment>
    )
  }
}

export default SlidesToolBar
