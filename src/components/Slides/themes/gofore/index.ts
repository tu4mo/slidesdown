import styled from 'styled-components'

import logoSvg from './logo.svg'

const ORANGE = '#fd8251'

const Theme = styled.div`
  .slide {
    background-image: url(${logoSvg});
    background-repeat: no-repeat;
    background-position: 2rem 95%;
    background-size: 1.5rem;
    color: #222;
  }

  h2 {
    position: relative;
    padding-bottom: 0.25em;

    &::after {
      background-color: ${ORANGE};
      bottom: 0;
      content: '';
      height: 6px;
      left: 0;
      position: absolute;
      width: 50px;
    }
  }

  ul {
    list-style-type: none;

    & > li {
      position: relative;

      &::before {
        background-color: ${ORANGE};
        border-radius: 50%;
        content: '';
        height: 0.5rem;
        left: -1.5rem;
        position: absolute;
        top: 0.75rem;
        width: 0.5rem;
      }
    }
  }
`

export { Theme }
