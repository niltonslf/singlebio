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

    const linkMock = (label?: string, url?: string) => {
      return {
        label: label || faker.word.words(2),
        url: url || faker.internet.url(),
      };
    };

    const linkMockCompareData = linkMock('instagram', 'http://instagram.com');

    const callbackMockResponse = [
      {
        data() {
          return linkMockCompareData;
        },
      },
      {
        data() {
          return linkMock();
        },
      },
    ];

    jest
      .spyOn(firestore, 'onSnapshot')
      .mockImplementation((query: any, callback: any) => {
        callback(callbackMockResponse);
        return jest.fn();
      });

    setup(<LinksList user={userMock} />);

    const list = screen.getByRole('list');
    expect(list.childElementCount).toBe(2);

    const firstItem = list.children[1];

    expect(firstItem.querySelector('span')?.textContent).toBe(
      linkMockCompareData.url,
    );

    expect(firstItem.textContent).toContain(linkMockCompareData.label);
  });
});
