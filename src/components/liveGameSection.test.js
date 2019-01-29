import React from 'react';
import { shallow } from 'enzyme';

import LiveGameSection from './liveGameSection';

describe('<LiveGameSection />', () => {
  it('Renders without crashing', () => {
    shallow(<LiveGameSection />);
  });
});