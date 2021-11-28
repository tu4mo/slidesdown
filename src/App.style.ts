import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-background:#edf1f5;
    --color-border: #e4e4e8;
    --color-dim-text: #a4a4a8;
    --color-light-text: #646468;
    --color-magenta: #c86dd7;
    --color-purple: #3023ae;
    --font-default: Rubik;
    --font-monospace: Inconsolata;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: var(--color-magenta);
  }

  body {
    font-family: var(--font-default);
    line-height: 1.4;
    margin: 0;
    padding: 0;
  }

  code {
    font-family: var(--font-monospace);
  }

  .Resizer {
    z-index: 1;
  }

  .Resizer.horizontal {
    cursor: row-resize;
    height: 10px;
    margin: -5px 0;
    padding: 5px 0;
    width: 100%;
  }

  .Resizer.vertical {
    cursor: col-resize;
    margin: 0 -5px;
    padding: 0 5px;
    width: 10px;
  }
`
