import styled from 'styled-components'

const StyledImageContainer = styled.span`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 2rem;
  position: absolute;
  top: 0;
  width: 100%;

  img {
    max-height: 100%;
    max-width: 100%;
  }
`

const Image = ({ src }: { src?: string | undefined }) => (
  <StyledImageContainer>
    <img
      alt=""
      src={src}
    />
  </StyledImageContainer>
)

export default Image
