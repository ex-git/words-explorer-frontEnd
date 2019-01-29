import React from 'react';
import { shallow } from 'enzyme';

import LiveGameForm from './liveGameForm';

describe('<LiveGameForm />', () => {
  it('Renders without crashing', () => {
    shallow(<LiveGameForm />);
  });
});