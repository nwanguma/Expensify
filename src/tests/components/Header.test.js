import React from 'react';
import { Header } from '../../components/Header';
import { shallow } from 'enzyme';

let wrapper, startLogout;

beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout} />);
});

test('Should render Header correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should run startLogout when button is clicked', () => {
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});