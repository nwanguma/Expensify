import React from 'react';
import { EditExpensePage } from '../../components/EditExpensePage';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expense';

let id, editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  id = expenses[2].id;
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<EditExpensePage expense={expenses[2]} editExpense={editExpense} removeExpense={removeExpense} history={history} />);
})

test('Should render the EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should call onSubmit on the EditExpensePage', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(editExpense).toHaveBeenCalledWith(id, expenses[2]);
  expect(history.push).toHaveBeenCalledWith('/');
});

test('Should call onRemove on the EditExpensePage', () => {
  wrapper.find('button').prop('onClick')();  
  expect(removeExpense).toHaveBeenCalledWith({ id });
  expect(history.push).toHaveBeenCalledWith('/');
});