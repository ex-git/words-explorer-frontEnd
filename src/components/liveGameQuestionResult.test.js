import React from 'react';
import { shallow } from 'enzyme';

import LiveGameQuestionResult from './liveGameQuestionResult';

describe('<LiveGameQuestionResult />', () => {
  it('Renders without crashing', () => {
    shallow(<LiveGameQuestionResult />);
  });
});