import { addExpense, removeExpense, editExpense, startAddExpense } from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';
import expense from '../fixtures/expense';
import moment from 'moment';
import uuid from 'uuid';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);

test('Should generate the addExpense action with the required expense data', () => {
  const action = addExpense(expense[0]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expense[0]
  })
})

test('Should generate the addExpense action with default data', () => {
  const action = addExpense({
    id: 'someid',
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  });
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: expect.any(Number)
    }
  })
})

test('Should generate the remove expense action', () => {
  const action = removeExpense({
    id: uuid()
  })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: expect.any(String)
  })
})

test('Should generate the edit expense action', () => {
  const id = uuid();
  const updates = {
    note: 'Spaghetti Bolognese',
    description: 'Food'
  };
  const result = editExpense(id, updates);
  expect(result).toEqual({
    type: 'EDIT_EXPENSE',
    id: expect.any(String),
    updates: updates
  })
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense to database and store with the default data', (done) => {
  const store = createMockStore({});
  const expenseDefault = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }

  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefault
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefault);
    done();
  });
});