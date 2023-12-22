import {setup} from '@/__tests__/utils'
import {Smartphone} from '@/app/components'
import {faker} from '@faker-js/faker'
import '@testing-library/jest-dom'

describe('Smartphone', () => {
  it('should render smartphone iframe', async () => {
    const url = faker.internet.url()

    setup(<Smartphone iframeUrl={url} />)

    const iframe = document.querySelector('iframe')

    expect(iframe).toHaveAttribute('src', `/${url}`)
  })

  it('should render smartphone iframe with default url', async () => {
    setup(<Smartphone />)

    const iframe = document.querySelector('iframe')

    expect(iframe).toHaveAttribute('src', `/demo`)
  })
})
