import React from 'react';
import { shallow } from 'enzyme';

import MainPage from './mainPage';

describe('<MainPage />', () => {
  it('Renders without crashing', () => {
    shallow(<MainPage />);
  });
});