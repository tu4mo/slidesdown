import styled from 'styled-components'

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
