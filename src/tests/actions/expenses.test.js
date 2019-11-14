import {
  addExpense, removeExpense,
  editExpense, startAddExpense, setExpenses, startSetExpenses,
  startRemoveExpense, startEditExpense
} from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';
import expenses from '../fixtures/expense';
import moment from 'moment';
import uuid from 'uuid';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expenseData[id] = { description, amount, note, createdAt: createdAt.valueOf() };
  });
  database.ref('expenses').set(expenseData).then(() => done());
});

test('Should generate the addExpense action with the required expense data', () => {
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  });
});

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

test('Should remove expense from firebase', (done) => {
  const id = expenses[0].id;
  const store = createMockStore();
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    })
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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

test('Should edit an expense in firebase', (done) => {
  const store = createMockStore();
  const id = expenses[2].id;
  const updates = {
    description: 'Non-vacation',
    note: 'A trip to the center of the Earth'
  }
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      description: 'Non-vacation',
      note: 'A trip to the center of the Earth',
      amount: 84800,
      createdAt: moment(0).subtract(1, 'month').valueOf(),
    })
    done();
  });
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

test('Should set expenses with data', () => {
  const action = setExpenses(expenses[0]);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses: expenses[0]
  });
});

test('Should fetch expenses from firebase', (done) => {
  const store = createMockStore();
  expenses[0].createdAt = expenses[0].createdAt.valueOf();
  expenses[1].createdAt = expenses[1].createdAt.valueOf();
  expenses[2].createdAt = expenses[2].createdAt.valueOf();

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});