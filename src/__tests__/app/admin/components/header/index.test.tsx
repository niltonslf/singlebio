import {User} from 'firebase/auth';

import {setup} from '@/__tests__/utils';
import {Header} from '@/app/admin/components/header';
import {faker} from '@faker-js/faker';
import {screen} from '@testing-library/react';

import '@testing-library/jest-dom';

describe('Header component', () => {
  it('render component with logo and user data', () => {
    const userMock = {
      displayName: faker.person.fullName(),
      photoURL: faker.image.urlLoremFlickr(),
    } as User;

    setup(<Header user={userMock} />);

    const header = screen.getByText('Lnktree admin');
    expect(header).toBeInTheDocument;

    const userName = screen.getByText(userMock.displayName || '');
    expect(userName.textContent).toBe(userMock.displayName);

    const profilePicture = screen.getByRole('img');
    expect(profilePicture).toBeInTheDocument;
  });

  it('render component without user image', () => {
    const userMock = {
      displayName: faker.person.fullName(),
      photoURL: null,
    } as User;

    setup(<Header user={userMock} />);

    const header = screen.getByText('Lnktree admin');
    expect(header).toBeInTheDocument;

    const userName = screen.getByText(userMock.displayName || '');
    expect(userName.textContent).toBe(userMock.displayName);

    const profilePicture = screen.queryByRole('img');
    expect(profilePicture).not.toBeInTheDocument;
  });

  it('render component without user name', () => {
    const userMock = {
      displayName: '',
      photoURL: faker.image.urlLoremFlickr(),
    } as User;

    setup(<Header user={userMock} />);

    const header = screen.getByText('Lnktree admin');
    expect(header).toBeInTheDocument;

    const userName = document.querySelector('header > div > span');
    expect(userName).toBeEmptyDOMElement();

    const profilePicture = screen.getByRole('img');
    expect(profilePicture).toBeInTheDocument();
  });

  it('render component without user logged', () => {
    const userMock = {
      displayName: '',
      photoURL: null,
    } as User;

    setup(<Header user={userMock} />);

    const header = screen.getByText('Lnktree admin');
    expect(header).toBeInTheDocument;

    const userName = document.querySelector('header > div > span');
    expect(userName).toBeEmptyDOMElement();

    const profilePicture = screen.queryByRole('img');
    expect(profilePicture).not.toBeInTheDocument();
  });
});
