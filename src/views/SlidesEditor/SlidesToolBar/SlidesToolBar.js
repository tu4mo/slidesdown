import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

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
    onPresentationClick: PropTypes.func.isRequired
  }

  state = {
    isAboutVisible: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isAboutVisible !== nextState.isAboutVisible
  }

  render() {
    const { onPresentationClick } = this.props
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
              <Icon
                alt="Presentation"
                onClick={onPresentationClick}
                tooltip="Presentation"
                type="presentation"
              />
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
