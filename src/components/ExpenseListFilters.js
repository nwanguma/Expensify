import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import uuid from 'uuid';
import 'react-dates/initialize';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
    startDateId: uuid(),
    endDateId: uuid()
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };
  render() {
    return (
      <div className="filters-container">
        <div className="input-container">
          <input
            placeholder="Search expenses"
            type="text"
            value={this.props.filters.text}
            onChange={this.onTextChange}
            className="search"
          />
          <select
            value={this.props.filters.sortBy}
            onChange={this.onSortChange}
            className="select"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>

          <DateRangePicker
            startDate={this.props.filters.startDate}
            startDateId={this.state.startDateId}
            endDate={this.props.filters.endDate}
            endDateId={this.state.endDateId}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
            small={true}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
