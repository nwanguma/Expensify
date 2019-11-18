import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { startRemoveExpense } from '../actions/expenses';

class ExpenseListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.id });
  }
  render() {
    return (
      <div className="expense-item-container">
        <Link to={`/edit/${this.props.id}`} className="expense__content 
        expense__content--link" >
          <h3 className="expense__text expense__content--description">
            {this.props.description}</h3>
        </Link>
        <span className="expense__text expense__content--amount">
          {`₦${numeral(this.props.amount / 100).format('0,0.00')}`}
        </span>
        <span className="expense__text expense__content--date">
          {moment(this.props.createdAt).format('MMMM Do, YYYY')}
        </span>
        <a onClick={this.onRemove} className="btn btn--remove" role="button">x</a>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(undefined, mapDispatchToProps)(ExpenseListItem);
