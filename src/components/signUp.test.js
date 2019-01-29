import React from 'react';
import { shallow } from 'enzyme';

import SignUp from './signUp';

describe('<SignUp />', () => {
  it('Renders without crashing', () => {
    shallow(<SignUp />);
  });
});