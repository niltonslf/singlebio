import '@testing-library/jest-dom';
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import mockRouter from 'next-router-mock';

import {setup} from '@/__tests__/utils';
import AuthPage from '@/app/auth/page';
import {faker} from '@faker-js/faker';
import {screen, render} from '@testing-library/react';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

jest.mock('firebase/firestore', () => {
  return {__esModule: true, ...jest.requireActual('firebase/firestore')};
});

jest.mock('firebase/auth', () => {
  return {__esModule: true, ...jest.requireActual('firebase/auth')};
});

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
        uid: faker.word.words(1),
        displayName: faker.person.fullName,
        email: faker.internet.email,
        photoURL: faker.image.urlLoremFlickr,
      },
    } as any);

    jest.spyOn(firestore, 'setDoc').mockImplementation(() => jest.fn() as any);

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
