import React from 'react';
import NotFoundPage from '../../components/NotFoundPage.js';
import { shallow } from 'enzyme';

test('Should render the NotFoundPage component', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
})