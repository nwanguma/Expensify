import React from 'react';
import { EditExpensePage } from '../../components/EditExpensePage';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expense';

let id, startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  id = expenses[2].id;
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<EditExpensePage expense={expenses[2]}
    startEditExpense={startEditExpense}
    startRemoveExpense={startRemoveExpense} history={history} />);
})

test('Should render the EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should call onSubmit on the EditExpensePage', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(startEditExpense).toHaveBeenCalledWith(id, expenses[2]);
  expect(history.push).toHaveBeenCalledWith('/');
});

test('Should call onRemove on the EditExpensePage', () => {
  wrapper.find('button').prop('onClick')();
  expect(startRemoveExpense).toHaveBeenCalledWith({ id });
  expect(history.push).toHaveBeenCalledWith('/');
});