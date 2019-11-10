import React from 'react';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { shallow } from 'enzyme';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let wrapper, setTextFilter, setStartDate, setEndDate, sortByDate, sortByAmount;
const { startDate, endDate } = altFilters;

beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setTextFilter = jest.fn();
  wrapper = shallow(<ExpenseListFilters
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setTextFilter={setTextFilter}
    filters={filters}
  />);
});

test('Should render the ExpenseListFilters component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should render the ExpenseListFilters component with a different set of filters data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  })
  expect(wrapper).toMatchSnapshot();
});

test('Should call onDatesChange', () => {
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('Should call onFocusChange', () => {
  wrapper.find('DateRangePicker').prop('onFocusChange')(startDate);
  expect(wrapper.state('calendarFocused')).toEqual(startDate);
});

test('Should call onTextChange', () => {
  const filterText = 'text';
  wrapper.find('input').simulate('change', {
    target: { value: filterText }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(filterText);
});

test('Should call onSortChange with sortBy amount', () => {
  const sortBy = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value: sortBy }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('Should call onSortChange with sortBy date', () => {
  const sortBy = 'date';
  wrapper.find('select').simulate('change', {
    target: { value: sortBy }
  });
  expect(sortByDate).toHaveBeenCalled();
});


