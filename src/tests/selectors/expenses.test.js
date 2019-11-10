import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expense';
import moment from 'moment';

test('Should filter expenses with the default filters', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([
    expenses[0], expenses[1], expenses[2]
  ])
})

test('Should filters expenses by text', () => {
  const filters = {
    text: 'Food',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[1]])
})

test('Should filter expenses by start date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[0], expenses[1]])
})

test('Should filter expenses by end date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).subtract(1, 'month').startOf('month')
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[2]])
})

test('Should sort expenses by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[0], expenses[1], expenses[2]])
})

test('Should sort expenses by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[2], expenses[1], expenses[0]])
})