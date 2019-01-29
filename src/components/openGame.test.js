import React from 'react';
import { shallow } from 'enzyme';

import OpenGame from './openGame';

describe('<OpenGame />', () => {
  it('Renders without crashing', () => {
    shallow(<OpenGame />);
  });
});