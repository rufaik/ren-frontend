import React from 'react';
import {Helmet} from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import Dates from './Dates'
import 'react-day-picker/lib/style.css';

export default class Calendar1 extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
    console.log(range)
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className="RangeExample">
        <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from && to && (
            <button className="link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          disabledDays={[
        new Date(2022, 3, 12),
        new Date(2022, 3, 2),
        {
          after: new Date(2022, 3, 20),
          before: new Date(2022, 3, 25),
        },
         {
          after: new Date(2022, 2, 20),
          before: new Date(2022, 2, 25),
        },
      ]}
        />
        <Helmet>
          <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #2C3949 !important;
    color: #BBBFC5;

  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
    background-color: #0B1A2C !important;
    color: #BBBFC5;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
    background-color: #0B1A2C !important;
    color: #BBBFC5;
  }
  .DayPicker-Caption {
    text-align: center;
    color: #0B1A2C !important;
    font-weight: 700 !important
}
`}</style>
        </Helmet>
        <Dates rangeF={this.state.from} rangeT={this.state.to} />
      </div>
    );
  }
}




