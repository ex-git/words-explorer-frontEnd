import React from 'react';
import { shallow } from 'enzyme';

import JoinGame from './joinGame';

describe('<JoinGame />', () => {
  it('Renders without crashing', () => {
    shallow(<JoinGame />);
  });
});