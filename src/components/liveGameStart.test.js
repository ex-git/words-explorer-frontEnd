import React from 'react';
import { shallow } from 'enzyme';

import LiveGameStart from './liveGameStart';

describe('<LiveGameStart />', () => {
  it('Renders without crashing', () => {
    shallow(<LiveGameStart />);
  });
});