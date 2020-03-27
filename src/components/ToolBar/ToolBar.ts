import styled from 'styled-components'

const StyledToolBar = styled.div`
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 2rem;
  display: flex;
  padding: 1rem;
`

export default StyledToolBar
