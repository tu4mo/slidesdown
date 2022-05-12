import { ReactNode } from 'react'
import Prism from 'prismjs'

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
import 'prismjs/components/prism-yaml'

interface Props {
  children: ReactNode
  className?: string | undefined
  inline?: boolean | undefined
}

const Code = ({ children, className, inline }: Props) => {
  const language = className?.replace('language-', '')

  const html =
    children &&
    language &&
    Prism.languages[language] &&
    Prism.highlight(String(children), Prism.languages[language], language)

  return html ? (
    <code dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <code>{children}</code>
  )
}

export default Code
