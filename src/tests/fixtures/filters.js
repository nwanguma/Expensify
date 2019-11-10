import moment from 'moment';

const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const altFilters = {
  text: 'filterText',
  sortBy: 'amount',
  startDate: moment().add(10, 'days'),
  endDate: moment().endOf('month')
}

export { filters, altFilters }