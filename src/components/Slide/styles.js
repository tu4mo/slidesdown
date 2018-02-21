import styled from 'styled-components'

export const StyledTransformContainer = styled.div`
  position: relative;
  height: ${props => props.height}px;
  width: ${props => props.width}px;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

export const StyledSlideContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 450px;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) scale(${props => props.scale});
  width: 800px;

  h1 {
    text-align: center;
  }

  ol,
  ul {
    padding-left: 1.5em;
  }
`

export const StyledSlide = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 150%;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 2rem;
  position: absolute;
  top: 0;
  width: 100%;
`
