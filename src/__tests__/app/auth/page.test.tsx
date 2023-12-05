import '@testing-library/jest-dom';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ReactElement} from 'react';
import AuthPage from '@/app/auth/page';

// import {useRouter} from 'next/navigation';

import mockRouter from 'next-router-mock';

import * as auth from 'firebase/auth';
// import * as nextNavigation from 'next/navigation';
import * as firestore from 'firebase/firestore';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

jest.mock('firebase/firestore', () => {
  return {
    __esModule: true,
    ...jest.requireActual('firebase/firestore'),
  };
});

jest.mock('firebase/auth', () => {
  return {
    __esModule: true,
    ...jest.requireActual('firebase/auth'),
  };
});

// setup function
function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

// jest.mock('next/navigation', () => ({
//   __esModule: true,
//   useRouter: jest.fn(),
//   // ...jest.requireActual('next/navigation'),
// }));

// jest.spyOn(nextNavigation, 'useRouter').mockImplementation(() => jest.fn());

describe('Auth Page', () => {
  it('render Auh page with the login button', () => {
    render(<AuthPage />);

    const formTitle = screen.getByText('SignIn');
    expect(formTitle.textContent).toBe('SignIn');

    const googleButton = screen.getByRole('button');
    expect(googleButton.textContent).toBe('Sign up with Google');
  });

  it('Should return an error when clicked to Login with Google', async () => {
    jest.spyOn(auth, 'signInWithPopup').mockRejectedValue('error');

    const {user} = setup(<AuthPage />);

    const googleButton = screen.getByRole('button');
    expect(googleButton.textContent).toBe('Sign up with Google');

    await user.click(googleButton);

    const errorBox = await screen.getByText(
      'There was an error to access your account. Please, try again later or use a different account.',
    );
    expect(errorBox).toBeVisible();
  });

  it('Should login with success when clicked at Login with Google', async () => {
    jest.spyOn(auth, 'signInWithPopup').mockResolvedValue({
      user: {
        uid: 'abc',
        displayName: 'Jhon',
        email: 'email@email.com',
        photoURL: 'picture-url',
      },
    });

    jest.spyOn(firestore, 'setDoc').mockImplementation(() => jest.fn());

    const {user} = setup(<AuthPage />);

    const googleButton = screen.getByRole('button');
    expect(googleButton.textContent).toBe('Sign up with Google');

    await user.click(googleButton);

    expect(mockRouter).toMatchObject({
      asPath: '/admin',
      pathname: '/admin',
      query: {},
    });
  });
});
