import {User} from 'firebase/auth';

import {setup} from '@/__tests__/utils';
import {AddLinkForm} from '@/app/admin/components';
import {faker} from '@faker-js/faker';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Add Link Form Component', () => {
  it('render form with all fields', () => {
    const userMock = {
      displayName: faker.person.fullName(),
      photoURL: faker.image.urlLoremFlickr(),
    } as User;

    setup(<AddLinkForm user={userMock} />);

    const inputUrl = screen.getByPlaceholderText('Type the url');
    expect(inputUrl).toBeInTheDocument();

    const inputLabel = screen.getByPlaceholderText('type the label');
    expect(inputLabel).toBeInTheDocument();

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });
});
