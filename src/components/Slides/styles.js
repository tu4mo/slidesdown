import styled from 'styled-components'

export const StyledSlides = styled.div`
  background-color: #f4f4f8;
  font-size: ${props => `${props.fontSize}%`};
  height: 100%;
  left: 0;
  overflow: auto;
  position: absolute;
  padding: 2rem;
  top: 0;
  width: 100%;
`

export const StyledSlideContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

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
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 2em;
  position: absolute;
  top: 0;
  width: 100%;
`
