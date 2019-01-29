import React from 'react';
import { shallow } from 'enzyme';

import IntroSection from './introSection';

describe('<IntroSection />', () => {
  it('Renders without crashing', () => {
    shallow(<IntroSection />);
  });
});