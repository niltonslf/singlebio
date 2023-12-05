import * as firestore from 'firebase/firestore';

import {setup} from '@/__tests__/utils';
import UserPage from '@/app/[userName]/page';
import '@testing-library/jest-dom';
import {faker} from '@faker-js/faker';
import {screen, waitFor} from '@testing-library/react';

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
}));

describe('Render user links page', () => {
  it('should render page with all elements', async () => {
    const userNameMock = 'jsdevbr';
    const getDocsResponse = {
      data: () => ({
        label: faker.word.words(2),
        url: faker.image.urlLoremFlickr(),
      }),
    } as any;

    jest.spyOn(firestore, 'getDocs').mockResolvedValue({
      docs: [getDocsResponse, getDocsResponse],
      size: 1,
    } as any);

    await waitFor(() => setup(<UserPage params={{userName: userNameMock}} />));

    const userName = screen.getByRole('heading', {level: 2});
    expect(userName.textContent).toBe(userNameMock);

    const linkList = await screen.queryByRole('list');
    expect(linkList?.children).toHaveLength(2);
  });
});
