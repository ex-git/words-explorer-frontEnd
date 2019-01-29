import React from 'react';
import { shallow } from 'enzyme';

import Ranking from './ranking';

describe('<Ranking />', () => {
  it('Renders without crashing', () => {
    shallow(<Ranking />);
  });
});