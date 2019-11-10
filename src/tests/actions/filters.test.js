import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters';
import moment from 'moment';

test('Should generate the text filter action with text', () => {
  const action = setTextFilter('canard');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'canard'
  })
})

test('Should generate the text filter action with the default', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
})

test('Should generate the sortBy date action', () => {
  expect(sortByDate().type).toBe('SORT_BY_DATE')
})

test('Should generate the sortBy amount action', () => {
  expect(sortByAmount().type).toBe('SORT_BY_AMOUNT')
})

test('Should generate the startDate action', () => {
  const startDate = moment().valueOf();
  const action = setStartDate(startDate);
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: startDate
  })
})

test('Should generate the endDate action', () => {
  const endDate = moment().valueOf();
  const action = setEndDate(endDate);
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: endDate
  })
})