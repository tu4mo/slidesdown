import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    language: PropTypes.string
  }

  render() {
    const { language, value } = this.props

    const html =
      value &&
      Prism.languages[language] &&
      Prism.highlight(this.props.value, Prism.languages[language])

    return (
      <pre>
        {html ? (
          <code
            dangerouslySetInnerHTML={{ __html: html }}
            className={this.props.language}
          />
        ) : (
          <code>{value}</code>
        )}
      </pre>
    )
  }
}

export default CodeBlock
