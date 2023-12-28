import {setup} from '@/__tests__/__helpers__'
import {Smartphone} from '@/app/components'
import {faker} from '@faker-js/faker'
import {screen} from '@testing-library/react'

describe('Smartphone', () => {
  it('should render smartphone iframe and load url', async () => {
    const url = faker.internet.url()

    setup(<Smartphone iframeUrl={url} />)

    const iframe = document.querySelector('iframe')

    expect(iframe).toHaveAttribute('src', url)
  })

  it('should render smartphone with loader', async () => {
    setup(<Smartphone />)

    const loader = screen.getByTestId('smartphone-loader')

    expect(loader).toBeVisible()
  })
})
