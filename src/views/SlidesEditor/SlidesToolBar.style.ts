import styled, { css } from 'styled-components'

export const StyledToolBarContainer = styled.div`
  bottom: 1rem;
  position: absolute;
  right: 1rem;
`

export const StyledLogoContainer = styled.div`
  align-items: center;
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  margin-bottom: -1rem;
  margin-right: 1rem;
  margin-top: -1rem;
  padding-right: 1rem;
  position: relative;
`

export const StyledIconWrapper = styled.div<{ withNotification: boolean }>`
  position: relative;

  ${props =>
    props.withNotification &&
    css`
      &::after {
        background-color: #d0021b;
        border-radius: 50%;
        border: 2px solid #fff;
        content: '';
        height: 0.75rem;
        pointer-events: none;
        position: absolute;
        top: 0;
        right: 0;
        width: 0.75rem;
      }
    `};
`
