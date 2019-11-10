import React from 'react';
import HelpPage from '../../components/HelpPage.js';
import { shallow } from 'enzyme';

test('Should render the HelpPage component', () => {
  const wrapper = shallow(<HelpPage />);
  expect(wrapper).toMatchSnapshot();
})