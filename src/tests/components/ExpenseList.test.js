import { ExpenseList } from '../../components/ExpenseList.js';
import { shallow } from 'enzyme';
import React from 'react';
import expenses from '../fixtures/expense.js';

test('Should render the expense list component without props', () => {
  const wrapper = shallow(<ExpenseList />);
  expect(wrapper).toMatchSnapshot();
})

test('Should render the expense list component with props', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
})