import React from 'React';
import { LoginPage } from '../../components/LoginPage';
import { shallow } from 'enzyme';

let wrapper, startLogin;

beforeEach(() => {
  startLogin = jest.fn();
  wrapper = shallow(<LoginPage startLogin={startLogin} />);
});

test('Should render the loginPage component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should run startLogin when button is clicked', () => {
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});