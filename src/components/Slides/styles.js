import styled from 'styled-components'

export const StyledSlides = styled.div`
  background-color: #f4f4f8;
  font-size: ${props => `${props.fontSize}%`};
  height: 100%;
  left: 0;
  overflow: auto;
  position: absolute;
  padding: 1rem;
  top: 0;
  width: 100%;
`

export const StyledSlideContainer = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  font-size: 200%;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    padding-top: 56.25%;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  h1 {
    text-align: center;
  }

  ol, ul {
    margin-left: 1.5em;
  }
`

export const StyledSlide = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 2rem;
  position: absolute;
  top: 0;
  width: 100%;
`
