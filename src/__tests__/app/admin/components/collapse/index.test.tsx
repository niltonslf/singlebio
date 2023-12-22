import {fail, setup} from '@/__tests__/utils'
import {Collapse} from '@/app/admin/components'
import {CollapseBody} from '@/app/admin/components/collapse/collapse-body'
import '@testing-library/jest-dom'
import {cleanup, screen, waitFor} from '@testing-library/react'

const makeSUT = (numOfItems: number = 1, toggle: boolean = false) => {
  const itemsArr = Array.from(Array(numOfItems).keys())

  return setup(
    <Collapse data-testid='collapse' toggle={toggle}>
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

describe('Collapse component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render with 3 items', () => {
    makeSUT(3)

    const collapse = screen.getByTestId('collapse')
    const items = collapse.querySelectorAll('article')

    expect(items.length).toBe(3)
  })

  it('should open and close collapse', async () => {
    const {user} = makeSUT(3)

    let collapse = screen.getByTestId('collapse')
    let items = collapse.querySelectorAll('article')

    let firstItemHeader = items[0].querySelector('header')
    let firstItemContent = items[0].querySelector('header + div')

    let secondItemHeader = items[1].querySelector('header')
    let secondItemContent = items[1].querySelector('header + div')

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
    expect(firstItemContent?.classList.contains('grid-rows-[1fr]')).toBe(false)
    expect(secondItemContent?.classList.contains('grid-rows-[1fr]')).toBe(false)

    await user.click(firstItemHeader)
    await user.click(secondItemHeader)

    await waitFor(async () => {
      // item opened
      expect(firstItemContent?.classList.contains('grid-rows-[1fr]')).toBe(true)
      expect(secondItemContent?.classList.contains('grid-rows-[1fr]')).toBe(
        true,
      )
    })
  })

  it('should open collapse and close others (toggle)', async () => {
    const {user} = makeSUT(3, true)

    let collapse = screen.getByTestId('collapse')
    let items = collapse.querySelectorAll('article')

    let firstItemHeader = items[0].querySelector('header')
    let firstItemContent = items[0].querySelector('header + div')

    let secondItemHeader = items[1].querySelector('header')
    let secondItemContent = items[1].querySelector('header + div')

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
    expect(firstItemContent?.classList.contains('grid-rows-[1fr]')).toBe(false)
    expect(secondItemContent?.classList.contains('grid-rows-[1fr]')).toBe(false)

    // open first item
    await user.click(firstItemHeader)
    // open second item and close first
    await user.click(secondItemHeader)

    await waitFor(async () => {
      // item close
      expect(firstItemContent?.classList.contains('grid-rows-[1fr]')).toBe(
        false,
      )
      // item open
      expect(secondItemContent?.classList.contains('grid-rows-[1fr]')).toBe(
        true,
      )
    })
  })
})
