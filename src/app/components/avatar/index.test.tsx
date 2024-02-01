import {setup} from '@/__tests__'
import {Avatar} from '@/app/components'
import {faker} from '@faker-js/faker'
import {screen} from '@testing-library/react'

const makeSUT = (name: string, pictureUrl?: string, size?: number) => {
  return setup(<Avatar name={name} pictureUrl={pictureUrl} size={size} />)
}

describe('Avatar Component', () => {
  it('should render avatar without image', () => {
    const {container} = makeSUT('James', undefined, 50)

    const initial = screen.getByText(/j/i)

    expect(initial).toBeVisible()
    expect(container.firstElementChild?.getAttribute('style')).toMatch(
      'width: 50px',
    )
  })

  it('should render avatar with image', () => {
    const imageUrl = faker.image.urlPicsumPhotos()
    makeSUT('James', imageUrl, 40)

    const initial = screen.getByText(/j/i)
    const profilePicture = screen.getByRole('img')

    expect(initial).toBeVisible()
    expect(profilePicture.getAttribute('src')).toMatch(
      encodeURIComponent(imageUrl),
    )
    expect(profilePicture.getAttribute('width')).toBe('40')
    expect(profilePicture.getAttribute('height')).toBe('40')
  })

  it('should render avatar with default size', () => {
    const {container} = makeSUT('James')

    const initial = screen.getByText(/j/i)

    expect(initial).toBeVisible()
    expect(container.firstElementChild?.getAttribute('style')).toMatch(
      'width: 50px',
    )
  })
})
