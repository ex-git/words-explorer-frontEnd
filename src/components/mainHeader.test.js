import React from 'react';
import { shallow } from 'enzyme';

import MainHeader from './mainHeader';

describe('<MainHeader />', () => {
  it('Renders without crashing', () => {
    shallow(<MainHeader />);
  });
});