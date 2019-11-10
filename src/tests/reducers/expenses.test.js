import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expense';
import moment from 'moment';
import uuid from 'uuid';

test('Should setup the default state', () => {
  const action = {
    type: '@@INIT'
  };
  const state = expensesReducer(undefined, action);
  expect(state).toEqual([])
})

test('Should add an expense', () => {
  const createdAt = moment();
  const id = uuid();
  const expense = {
    description: 'Slytherin flexing',
    note: 'A trip to Hogwarts',
    amount: 200,
    createdAt,
    id
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense,
    id
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense])
});

test('Should remove an expense', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
    expenses[0], expenses[2]
  ])
});

test('Should edit expense with updates', () => { 
  const updates = {
    description: 'Vacation',
    note: 'A trip to the horn of Africa',
    amount: 451800,
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[2].id,
    updates
  }
  const state = expensesReducer(expenses, action);
  expect(state[2]).toEqual({
    description: 'Vacation',
    note: 'A trip to the horn of Africa',
    amount: 451800,
    createdAt: expect.any(Object),
    id: expect.any(String)
  })  
})