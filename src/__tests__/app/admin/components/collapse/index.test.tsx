import {fail, setup} from '@/__tests__/utils'
import {Collapse} from '@/app/admin/components'
import {CollapseBody} from '@/app/admin/components/collapse/collapse-body'
import '@testing-library/jest-dom'
import {cleanup, screen, waitFor} from '@testing-library/react'

const makeSUT = (
  numOfItems: number = 1,
  toggle: boolean = false,
  defaultOpen?: number,
) => {
  const itemsArr = Array.from(Array(numOfItems).keys())

  return setup(
    <Collapse data-testid='collapse' toggle={toggle} defaultOpen={defaultOpen}>
      {itemsArr.map(item => {
        return (
          <Collapse.Item key={item} index={item}>
            <Collapse.Header>Header</Collapse.Header>
            <CollapseBody>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
                similique, labore dolores ipsa dignissimos quidem omnis
                voluptate, iure nesciunt ea fuga temporibus minima sed
                recusandae? Debitis officia adipisci eveniet asperiores.
              </p>
            </CollapseBody>
          </Collapse.Item>
        )
      })}
    </Collapse>,
  )
}

const getCollapseItems = () => {
  let collapse = screen.getByTestId('collapse')
  let items = collapse.querySelectorAll('article')

  return {
    items,
  }
}

const getCollapseItem = (index: number, items: NodeListOf<HTMLElement>) => {
  let header = items[index].querySelector('header')
  let content = items[index].querySelector('header + div')

  return [header, content]
}

const expectCollapseOpen = (content: Element, isOpen: boolean = true) => {
  expect(content?.classList.contains('grid-rows-[1fr]')).toBe(isOpen)
}

describe('Collapse component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render with 3 items', () => {
    makeSUT(3)

    const {items} = getCollapseItems()

    expect(items.length).toBe(3)
  })

  it('should open and close collapse', async () => {
    const {user} = makeSUT(3)

    const {items} = getCollapseItems()
    const [firstItemHeader, firstItemContent] = getCollapseItem(0, items)
    const [secondItemHeader, secondItemContent] = getCollapseItem(1, items)

    if (
      !firstItemHeader ||
      !firstItemContent ||
      !secondItemHeader ||
      !secondItemContent
    )
      return fail()

    expect(firstItemHeader).toBeVisible()
    expect(secondItemHeader).toBeVisible()

    // item closed
    expectCollapseOpen(firstItemContent, false)
    expectCollapseOpen(secondItemContent, false)

    await user.click(firstItemHeader)
    await user.click(secondItemHeader)

    await waitFor(async () => {
      // item opened
      expectCollapseOpen(firstItemContent, true)
      expectCollapseOpen(secondItemContent, true)
    })

    // close 2nd item
    await user.click(secondItemHeader)

    await waitFor(async () => {
      // item opened
      expectCollapseOpen(firstItemContent, true)
      expectCollapseOpen(secondItemContent, false)
    })
  })

  it('should open collapse and close others (toggle)', async () => {
    const {user} = makeSUT(3, true)

    const {items} = getCollapseItems()
    const [firstItemHeader, firstItemContent] = getCollapseItem(0, items)
    const [secondItemHeader, secondItemContent] = getCollapseItem(1, items)

    if (
      !firstItemHeader ||
      !firstItemContent ||
      !secondItemHeader ||
      !secondItemContent
    )
      return fail()

    expect(firstItemHeader).toBeVisible()
    expect(secondItemHeader).toBeVisible()

    // item closed
    expectCollapseOpen(firstItemContent, false)
    expectCollapseOpen(secondItemContent, false)

    // open first item
    await user.click(firstItemHeader)
    // open second item and close first
    await user.click(secondItemHeader)

    await waitFor(async () => {
      expectCollapseOpen(firstItemContent, false)
      expectCollapseOpen(secondItemContent, true)
    })
  })

  it('should start with second item opened', () => {
    makeSUT(3, false, 1)

    const {items} = getCollapseItems()
    const [, firstItemContent] = getCollapseItem(0, items)
    const [, secondItemContent] = getCollapseItem(1, items)

    if (!firstItemContent || !secondItemContent) return fail()

    expectCollapseOpen(firstItemContent, false)
    expectCollapseOpen(secondItemContent, true)
  })
})
