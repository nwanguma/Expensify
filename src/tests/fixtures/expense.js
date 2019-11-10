import moment from 'moment';

const expense = [{
  description: 'Drinks',
  note: 'Three casks of bordeux wine for the Mrs',
  amount: 6700,
  createdAt: moment(0).add(1, 'month'),
  id: 'ioeyuienjdsjaoiihepo'
}, {
  description: 'Food',
  note: 'Food for the month of September',
  amount: 9000,
  createdAt: moment(0),
  id: 'joahaiuarhkafklaheikl'
}, {
  description: 'Vacation',
  note: 'A trip to South Sudan',
  amount: 84800,
  createdAt: moment(0).subtract(1, 'month'),
  id: 'einabahajkahajahaoiaka'
}]

export default expense;