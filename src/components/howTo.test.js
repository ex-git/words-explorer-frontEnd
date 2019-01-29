import React from 'react';
import { shallow } from 'enzyme';

import HowTo from './howTo';

describe('<HowTo />', () => {
  it('Renders without crashing', () => {
    shallow(<HowTo />);
  });
});