import {User} from 'firebase/auth';
import * as firestore from 'firebase/firestore';

import {setup} from '@/__tests__/utils';
import {LinksList} from '@/app/admin/components/links-list';
import {Link} from '@/app/components';
import {faker} from '@faker-js/faker';
import {screen} from '@testing-library/react';

import '@testing-library/jest-dom';

describe('Link component', () => {
  it('should render Link.container with a children', () => {
    const {baseElement} = setup(
      <Link.container>
        <span>I'm a child</span>
      </Link.container>,
    );

    expect(baseElement.childElementCount).toBe(1);
    expect(baseElement.children[0].textContent).toBe("I'm a child");
  });

  it('should render Link.item with a children', () => {
    const {baseElement} = setup(
      <Link.item path='/'>
        <span>I'm a child</span>
      </Link.item>,
    );

    expect(baseElement.childElementCount).toBe(1);
    expect(baseElement.children[0].textContent).toBe("I'm a child");
  });

  it('Link.item should  have a link tag', () => {
    const {baseElement} = setup(
      <Link.item path='/'>
        <span>I'm a child</span>
      </Link.item>,
    );

    expect(baseElement?.querySelector('a')?.getAttribute('href')).toBe('/');
  });
});
