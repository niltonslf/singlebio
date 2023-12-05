import {User} from 'firebase/auth';
import * as firestore from 'firebase/firestore';

import {setup} from '@/__tests__/utils';
import {LinksList} from '@/app/admin/components/links-list';
import {faker} from '@faker-js/faker';
import {screen} from '@testing-library/react';

import '@testing-library/jest-dom';

jest.mock('firebase/firestore', () => {
  return {__esModule: true, ...jest.requireActual('firebase/firestore')};
});

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

  it('render component with 2 items', () => {
    const userMock = {
      uid: faker.string.uuid(),
      displayName: faker.person.fullName(),
      photoURL: faker.image.urlLoremFlickr(),
    } as User;

    const callbackMockResponse = {
      data() {
        return {
          label: faker.word.words(2),
          url: faker.internet.url(),
        };
      },
    };

    jest
      .spyOn(firestore, 'onSnapshot')
      .mockImplementation((query: any, callback: any) => {
        callback([callbackMockResponse, callbackMockResponse]);
        return jest.fn();
      });

    setup(<LinksList user={userMock} />);

    const list = screen.getByRole('list');
    expect(list.childElementCount).toBe(2);
  });
});
