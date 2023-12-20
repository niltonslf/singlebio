import {setup} from '@/__tests__/utils'
import {LinkCard} from '@/app/components'

import '@testing-library/jest-dom'

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
    const {baseElement} = setup(
      <LinkCard.Item path='/'>
        <span>I'm a child</span>
      </LinkCard.Item>,
    )

    expect(baseElement.childElementCount).toBe(1)
    expect(baseElement.children[0].textContent).toBe("I'm a child")
  })

  it('LinkCard.Item should  have a link tag', () => {
    const {baseElement} = setup(
      <LinkCard.Item path='/'>
        <span>I'm a child</span>
      </LinkCard.Item>,
    )

    expect(baseElement?.querySelector('a')?.getAttribute('href')).toBe('/')
  })
})
