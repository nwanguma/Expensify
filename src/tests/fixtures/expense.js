import moment from 'moment';

const expense = [{
  description: 'Drinks',
  note: 'Three casks of bordeux wine for the Mrs',
  amount: 6700,
  createdAt: moment(0).add(1, 'month'),
  id: '0'
}, {
  description: 'Food',
  note: 'Food for the month of September',
  amount: 9000,
  createdAt: moment(0),
  id: '1'
}, {
  description: 'Vacation',
  note: 'A trip to South Sudan',
  amount: 84800,
  createdAt: moment(0).subtract(1, 'month'),
  id: '2'
}]

export default expense;