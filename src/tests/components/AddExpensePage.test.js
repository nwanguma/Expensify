import React from 'react';
import { AddExpensePage } from '../../components/AddExpensePage';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expense';

let wrapper, history, startAddExpense;

beforeEach(() => {
  startAddExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />)
})

test('Should render the AddExpensePage component correctly', () => {
  expect(wrapper).toMatchSnapshot();
})

test('Should call onSubmit on the AddExpensePage component', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(startAddExpense).toHaveBeenCalledWith(expenses[2]);
  expect(history.push).toHaveBeenCalledWith('/');
})