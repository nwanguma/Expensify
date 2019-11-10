import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('Should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
})

test('Should setup text filter', () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    text: 'Text'
  }
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe('Text')
})

test('Should set the sortBy to amount', () => {
  const action = {
    type: 'SORT_BY_AMOUNT',
  }
  const state = filtersReducer(undefined, action);
  expect(state.sortBy).toBe('amount')
})

test('Should set the sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }
  const action = {
    type: 'SORT_BY_DATE',
  }
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date')
})

test('Should set the start date', () => {
  const startDate = moment();
  const action = {
    type: 'SET_START_DATE',
    startDate
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toBe(startDate)
})

test('Should set the end date', () => {
  const endDate = moment();
  const action = {
    type: 'SET_END_DATE',
    endDate
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toBe(endDate)
})