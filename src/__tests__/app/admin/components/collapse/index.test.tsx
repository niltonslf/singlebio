import {setup} from '@/__tests__/utils'
import {Collapse} from '@/app/admin/components'
import {CollapseBody} from '@/app/admin/components/collapse/collapse-body'
import '@testing-library/jest-dom'
import {cleanup, screen} from '@testing-library/react'

const makeSUT = (numOfItems: number = 1) => {
  const itemsArr = Array.from(Array(numOfItems).keys())

  setup(
    <Collapse data-testid='collapse'>
      {itemsArr.map(item => {
        return (
          <Collapse.Item key={item} index={item}>
            <Collapse.Header>Header</Collapse.Header>
            <CollapseBody>content</CollapseBody>
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

  it.todo('should open and close collapse')

  it.todo('should open collapse and close others (toggle)')
})
