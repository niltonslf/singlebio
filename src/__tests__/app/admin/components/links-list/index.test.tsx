import {User} from 'firebase/auth';

import {setup} from '@/__tests__/utils';
import {LinksList} from '@/app/admin/components/links-list';
import {faker} from '@faker-js/faker';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Links List component', () => {
  it('render component empty', () => {
    const userMock = {
      displayName: faker.person.fullName(),
      photoURL: faker.image.urlLoremFlickr(),
    } as User;

    setup(<LinksList user={userMock} />);

    const list = screen.getByRole('list');
    expect(list.childElementCount).toBe(0);
  });
});
