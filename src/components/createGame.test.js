import React from 'react';
import { shallow } from 'enzyme';

import CreateGame from './createGame';

describe('<CreateGame />', () => {
  it('Renders without crashing', () => {
    shallow(<CreateGame />);
  });
});