import {setup} from '@/__tests__/utils';
import {AddLinkForm} from '@/app/admin/components';
import {faker} from '@faker-js/faker';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const mockLogin = jest.fn((data: any) => {
  return Promise.resolve(data);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Add Link Form Component', () => {
  it('render form with all fields', () => {
    setup(<AddLinkForm saveLink={mockLogin} />);

    const inputUrl = screen.getByPlaceholderText('Type the url');
    expect(inputUrl).toBeInTheDocument();

    const inputLabel = screen.getByPlaceholderText('type the label');
    expect(inputLabel).toBeInTheDocument();

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });

  it('validate input data on submit', async () => {
    const {user} = setup(<AddLinkForm saveLink={mockLogin} />);
    const mockData = {
      url: faker.image.urlLoremFlickr(),
      label: faker.word.words(2),
    };

    const inputUrl = screen.getByPlaceholderText('Type the url');
    await user.type(inputUrl, mockData.url);

    const inputLabel = screen.getByPlaceholderText('type the label');
    await user.type(inputLabel, mockData.label);

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith({
      label: mockData.label,
      url: mockData.url,
    });
  });

  it('should not submit without all fields filled', async () => {
    const {user} = setup(<AddLinkForm saveLink={mockLogin} />);

    const inputLabel = screen.getByPlaceholderText('type the label');
    await user.type(inputLabel, faker.word.words(2));

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    expect(mockLogin).not.toHaveBeenCalled();
  });
});
