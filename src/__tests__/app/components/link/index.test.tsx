import {setup} from '@/__tests__/utils'
import {LinkCard} from '@/app/components'

import '@testing-library/jest-dom'

describe('Link component', () => {
  it('should render LinkCard.container with a children', () => {
    const {baseElement} = setup(
      <LinkCard.container>
        <span>I'm a child</span>
      </LinkCard.container>,
    )

    expect(baseElement.childElementCount).toBe(1)
    expect(baseElement.children[0].textContent).toBe("I'm a child")
  })

  it('should render LinkCard.item with a children', () => {
    const {baseElement} = setup(
      <LinkCard.item path='/'>
        <span>I'm a child</span>
      </LinkCard.item>,
    )

    expect(baseElement.childElementCount).toBe(1)
    expect(baseElement.children[0].textContent).toBe("I'm a child")
  })

  it('LinkCard.item should  have a link tag', () => {
    const {baseElement} = setup(
      <LinkCard.item path='/'>
        <span>I'm a child</span>
      </LinkCard.item>,
    )

    expect(baseElement?.querySelector('a')?.getAttribute('href')).toBe('/')
  })
})
