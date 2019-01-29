import React from 'react';
import { shallow } from 'enzyme';

import LiveGameCompleted from './liveGameCompleted';

describe('<LiveGameCompleted />', () => {
  it('Renders without crashing', () => {
    shallow(<LiveGameCompleted />);
  });
});