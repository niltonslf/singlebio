import {makeLink, setup} from '@/__tests__/__helpers__'
import {LinkCard} from '@/app/[username]/components/link-card'

describe('Link component', () => {
  it('should render LinkCard with a children', () => {
    const {baseElement} = setup(
      <LinkCard>
        <span>I'm a child</span>
      </LinkCard>,
    )

    expect(baseElement.childElementCount).toBe(1)
    expect(baseElement.children[0].textContent).toBe("I'm a child")
  })

  it('should render LinkCard.Item with a children', () => {
    const linkMock = makeLink()

    const {baseElement} = setup(
      <LinkCard.Item link={linkMock}>
        <span>I'm a child</span>
      </LinkCard.Item>,
    )

    expect(baseElement.childElementCount).toBe(1)
    expect(baseElement.children[0].textContent).toBe("I'm a child")
  })

  it('LinkCard.Item should  have a link tag', () => {
    const linkMock = makeLink()

    const {baseElement} = setup(
      <LinkCard.Item link={linkMock}>
        <span>I'm a child</span>
      </LinkCard.Item>,
    )

    const link = baseElement?.querySelector('a')

    expect(link?.getAttribute('href')).toBe(linkMock.url)
  })
})
