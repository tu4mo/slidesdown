import { Icon } from '.'
import { ReactNode } from 'react'
import { render } from '@testing-library/react'

vi.mock('@tippy.js/react', async () => {
  return {
    default: ({ children }: { children: ReactNode }) => <>{children}</>,
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<Icon type="presentation" />)

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="_button_779da8"
        type="button"
      >
        <img
          class="_icon_779da8"
          src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3epresentation%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cg%20id='presentation'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3crect%20id='Rectangle-3'%20stroke='%233023AE'%20stroke-width='2'%20x='6'%20y='7'%20width='20'%20height='12'%20rx='2'/%3e%3crect%20id='Rectangle-4'%20fill='%233023AE'%20x='15'%20y='19'%20width='2'%20height='8'%20rx='1'/%3e%3crect%20id='Rectangle-4-Copy'%20fill='%233023AE'%20x='12'%20y='25'%20width='8'%20height='2'%20rx='1'/%3e%3c/g%3e%3c/svg%3e"
        />
      </button>
    </DocumentFragment>
  `)
})

it('renders correctly with tooltip', () => {
  const { asFragment } = render(
    <Icon
      tooltip="Test"
      type="share"
    />,
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="_button_779da8"
        type="button"
      >
        <img
          class="_icon_779da8"
          src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3eshare%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cg%20id='share'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cpath%20d='M9,15%20C7.8954305,15%207,15.8954305%207,17%20L7,23%20C7,24.1045695%207.8954305,25%209,25%20L23,25%20C24.1045695,25%2025,24.1045695%2025,23%20L25,17%20C25,15.8954305%2024.1045695,15%2023,15%20L9,15%20Z%20M9,13%20L23,13%20C25.209139,13%2027,14.790861%2027,17%20L27,23%20C27,25.209139%2025.209139,27%2023,27%20L9,27%20C6.790861,27%205,25.209139%205,23%20L5,17%20C5,14.790861%206.790861,13%209,13%20Z'%20id='Rectangle-3'%20fill='%233023AE'%20fill-rule='nonzero'/%3e%3crect%20id='Rectangle-4'%20fill='%233023AE'%20x='15'%20y='5'%20width='2'%20height='15'%20rx='1'/%3e%3cg%20id='Group-2'%20transform='translate(16.000000,%208.000000)%20rotate(-45.000000)%20translate(-16.000000,%20-8.000000)%20translate(13.000000,%205.000000)'%20fill='%233023AE'%3e%3crect%20id='Rectangle-4-Copy'%20x='4'%20y='0'%20width='2'%20height='6'%20rx='1'/%3e%3crect%20id='Rectangle-4-Copy-2'%20x='0'%20y='0'%20width='6'%20height='2'%20rx='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
        />
      </button>
    </DocumentFragment>
  `)
})
