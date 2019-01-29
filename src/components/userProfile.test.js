import React from 'react';
import { shallow } from 'enzyme';

import UserProfile from './userProfile';

describe('<UserProfile />', () => {
  it('Renders without crashing', () => {
    shallow(<UserProfile />);
  });
});