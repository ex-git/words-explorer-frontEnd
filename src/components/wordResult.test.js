import React from 'react';
import { shallow } from 'enzyme';

import WordResult from './wordResult';

describe('<WordResult />', () => {
  it('Renders without crashing', () => {
    shallow(<WordResult />);
  });
});