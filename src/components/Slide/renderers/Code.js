import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import { createGlobalStyle } from 'styled-components'

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-elixir'
import 'prismjs/components/prism-elm'
import 'prismjs/components/prism-erlang'
import 'prismjs/components/prism-flow'
import 'prismjs/components/prism-git'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-haskell'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-perl'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-pug'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-scala'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-stylus'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-xojo'
import 'prismjs/components/prism-yaml'

import prismCSS from 'prismjs/themes/prism.css'
const GlobalStyle = createGlobalStyle`${prismCSS}`

class Code extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    language: PropTypes.string
  }

  render() {
    const { language, value } = this.props

    const html =
      value &&
      Prism.languages[language] &&
      Prism.highlight(this.props.value, Prism.languages[language], language)

    return (
      <pre>
        {html ? (
          <code
            className={this.props.language}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <code>{value}</code>
        )}
        <GlobalStyle />
      </pre>
    )
  }
}

export default Code
