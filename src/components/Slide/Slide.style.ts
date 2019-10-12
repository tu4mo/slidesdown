import styled, { css } from 'styled-components'

export const StyledTransformContainer = styled.div`
  position: relative;

  &:not(:last-child) {
    margin-bottom: 1rem;

    @media (min-width: ${props => props.theme.breakpoints.xl}) {
      margin-bottom: 2rem;
    }
  }
`

export const StyledSlideContainer = styled.div<{ single?: boolean }>`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 120%;
  height: 450px;
  justify-content: center;
  left: 50%;
  overflow: hidden;
  padding: 2rem;
  position: absolute;
  top: 50%;
  width: 800px;

  ${props =>
    !props.single &&
    css`
      box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.1);
      border-radius: 0.25rem;
    `};

  h1 {
    text-align: center;
  }

  ol,
  ul {
    padding-left: 1.5em;
  }
`
