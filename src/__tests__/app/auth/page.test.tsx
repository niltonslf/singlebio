import '@testing-library/jest-dom';
import {screen, render} from '@testing-library/react';

import AuthPage from '@/app/auth/page';

jest.mock('next/navigation', () => ({
  useRouter: () => {
    return {
      prefetch: () => null,
    };
  },
}));

describe('Auth Page', () => {
  it('render Auh page with the login button', () => {
    render(<AuthPage />);

    const formTitle = screen.getByText('SignIn');
    expect(formTitle.textContent).toBe('SignIn');

    const googleBUtton = screen.getByRole('button');
    expect(googleBUtton.textContent).toBe('Sign up with Google');
  });
});
