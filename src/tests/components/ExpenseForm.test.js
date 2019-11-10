import React from 'react';
import ExpenseForm from '../../components/ExpenseForm.js';
import expenses from '../fixtures/expense';
import { shallow } from 'enzyme';
import moment from 'moment';

test('Should render the expenseForm component correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
})

test('Should render the expenseForm component with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
})

test('Should render error with invalid form submissions', () => {
  expect(wrapper).toMatchSnapshot();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
})

test('Should set the description on input change', () => {
  const value = 'Some description';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
  expect(wrapper).toMatchSnapshot();
})

test('Should set the amount with valid input', () => {
  const value = '12.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
  expect(wrapper).toMatchSnapshot();
})

test('Should set the amount with invalid input', () => {
  const value = '12.501';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('');
  expect(wrapper).toMatchSnapshot();
})

test('Should call onSubmit prop for valid form submission', () => {
  const { description, amount, note } = expenses[1];
  const createdAt = moment(0).valueOf();

  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description, amount, createdAt, note
  })
})

test('Should check that the onDateChange prop on the SingleDatePicker component', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
})

test('Should check that the onFocusChange prop on the SingleDatePicker component', () => {
  const calendarFocused = { focused: true };
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused.focused);
})
