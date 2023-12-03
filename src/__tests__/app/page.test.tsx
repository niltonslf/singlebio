import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import HomePage from '@/app/page';

describe('Home Page', () => {
  it('render home page', () => {
    render(<HomePage />);

    const text = screen.getByText('Home page');

    expect(text.textContent).toEqual('Home page');
  });
});
