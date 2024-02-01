import {
  makeLink,
  makeSocialPage,
  makeUser,
  makeUserTheme,
  setup,
} from '@/__tests__'
import {GrayTheme} from '@/app/[username]/themes'
import {Link, SocialPage, User, UserTheme} from '@/domain/models'
import {screen} from '@testing-library/react'

type SUTProps = {
  links?: Link[]
  theme?: UserTheme
  user?: User
  socialPages?: SocialPage[]
}

const makeSUT = (props: SUTProps = {}) => {
  const linkMock = [makeLink(), makeLink()]
  const userThemeMock = makeUserTheme({buttonStyle: 'square'})
  const userMock = makeUser()
  const socialPagesMock = [makeSocialPage(), makeSocialPage()]

  const render = setup(
    <GrayTheme
      links={props?.links ?? linkMock}
      theme={props?.theme ?? userThemeMock}
      user={props?.user ?? userMock}
      socialPages={props?.socialPages ?? socialPagesMock}
    />,
  )

  return {
    ...render,
    linkMock,
    userThemeMock,
    userMock,
    socialPagesMock,
  }
}

describe('Gray theme', () => {
  it('should render theme', async () => {
    const {userMock} = makeSUT()

    const header = screen.queryByTestId('user-page-header')
    const headerPicture = header?.querySelector('img')
    const headerName = header?.querySelector('h2')
    const headerBio = header?.querySelector('p')

    const socialPages = screen.queryByTestId('user-page-social-pages')
    const pageLinks = screen.queryByTestId('user-page-page-links')

    expect(headerPicture?.src).toMatch(encodeURIComponent(userMock.pictureUrl))
    expect(headerName).toHaveTextContent(userMock.name)
    expect(headerBio).toHaveTextContent(userMock.bio)

    expect(socialPages?.children).toHaveLength(2)
    expect(pageLinks?.children).toHaveLength(2)
  })
})
