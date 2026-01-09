import { Slide } from '.'
import { render } from '@testing-library/react'

const MARKDOWN =
  '# Heading 1\n\n---\n\n' +
  '## Heading 2\n\n- List Item 1\n  - Sub List Item\n- List Item 2\n- List Item 3\n- List Item 4\n- List Item 5\n\n---\n\n' +
  '### Heading 3\n\n1. Numbered Item 1\n   1. Sub Numbered Item\n2. Numbered Item 2\n3. Numbered Item 3\n4. Numbered Item 4\n5. Numbered Item 5\n\n---\n\n' +
  "#### Heading 4\n\n```javascript\nconst variable = '123'\nconsole.log(variable)\n```\n\n---\n\n" +
  '##### Heading 5\n\n*Italic text*  \n**Bold text**  \n~~Strikethrough text~~\n\n---\n\n' +
  '###### Heading 6\n\n[Slidesdown](https://slidesdown.com)\n\n> Blockquote\n\n---\n\n' +
  '![image](http://www.domain.com/image.jpg)\n\n---\n\n' +
  'Column 1 | Column 2 | Column 3\n--- | --- | ---\nCell 1 | Cell 2 | Cell 3\n\n---\n\n'

it('renders correctly', () => {
  const { asFragment } = render(
    <Slide
      height={450}
      markdown={MARKDOWN}
      scale={1}
      width={800}
    />,
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="sc-bRKDuR fsIIfS"
        style="height: 450px; width: 800px;"
      >
        <div
          class="sc-hvigdm jXKUBY slide"
          style="transform: translate(-50%, -50%) scale(1);"
        >
          <div>
            <h1>
              Heading 1
            </h1>
            

            <hr />
            

            <h2>
              Heading 2
            </h2>
            

            <ul>
              

              <li>
                List Item 1

                <ul>
                  

                  <li>
                    Sub List Item
                  </li>
                  

                </ul>
                

              </li>
              

              <li>
                List Item 2
              </li>
              

              <li>
                List Item 3
              </li>
              

              <li>
                List Item 4
              </li>
              

              <li>
                List Item 5
              </li>
              

            </ul>
            

            <hr />
            

            <h3>
              Heading 3
            </h3>
            

            <ol>
              

              <li>
                Numbered Item 1

                <ol>
                  

                  <li>
                    Sub Numbered Item
                  </li>
                  

                </ol>
                

              </li>
              

              <li>
                Numbered Item 2
              </li>
              

              <li>
                Numbered Item 3
              </li>
              

              <li>
                Numbered Item 4
              </li>
              

              <li>
                Numbered Item 5
              </li>
              

            </ol>
            

            <hr />
            

            <h4>
              Heading 4
            </h4>
            

            <pre>
              <code>
                <span
                  class="token keyword"
                >
                  const
                </span>
                 variable 
                <span
                  class="token operator"
                >
                  =
                </span>
                 
                <span
                  class="token string"
                >
                  '123'
                </span>
                
    console
                <span
                  class="token punctuation"
                >
                  .
                </span>
                <span
                  class="token function"
                >
                  log
                </span>
                <span
                  class="token punctuation"
                >
                  (
                </span>
                variable
                <span
                  class="token punctuation"
                >
                  )
                </span>
                

              </code>
            </pre>
            

            <hr />
            

            <h5>
              Heading 5
            </h5>
            

            <p>
              <em>
                Italic text
              </em>
              <br />
              

              <strong>
                Bold text
              </strong>
              <br />
              

              <del>
                Strikethrough text
              </del>
            </p>
            

            <hr />
            

            <h6>
              Heading 6
            </h6>
            

            <p>
              <a
                href="https://slidesdown.com"
              >
                Slidesdown
              </a>
            </p>
            

            <blockquote>
              

              <p>
                Blockquote
              </p>
              

            </blockquote>
            

            <hr />
            

            <p>
              <span
                class="_imageContainer_acdb4f"
              >
                <img
                  alt=""
                  src="http://www.domain.com/image.jpg"
                />
              </span>
            </p>
            

            <hr />
            

            <table
              class="_table_0bd776"
            >
              <thead>
                <tr>
                  <th
                    class="_th_3a2981"
                  >
                    Column 1
                  </th>
                  <th
                    class="_th_3a2981"
                  >
                    Column 2
                  </th>
                  <th
                    class="_th_3a2981"
                  >
                    Column 3
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    class="_td_3a2981"
                  >
                    Cell 1
                  </td>
                  <td
                    class="_td_3a2981"
                  >
                    Cell 2
                  </td>
                  <td
                    class="_td_3a2981"
                  >
                    Cell 3
                  </td>
                </tr>
              </tbody>
            </table>
            

            <hr />
          </div>
        </div>
      </div>
    </DocumentFragment>
  `)
})
