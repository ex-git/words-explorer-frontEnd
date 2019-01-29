import React from 'react';
import { shallow } from 'enzyme';

import CreateGamePool from './createGamePool';

describe('<CreateGamePool />', () => {
  it('Renders without crashing', () => {
    shallow(<CreateGamePool />);
  });
});