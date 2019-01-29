import React from 'react';
import { shallow } from 'enzyme';

import LiveGame from './liveGame';

describe('<LiveGame />', () => {
  it('Renders without crashing', () => {
    shallow(<LiveGame />);
  });
});