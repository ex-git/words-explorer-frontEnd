import React from 'react';
import { shallow } from 'enzyme';

import LogIn from './logIn';

describe('<LogIn />', () => {
  it('Renders without crashing', () => {
    shallow(<LogIn />);
  });
});