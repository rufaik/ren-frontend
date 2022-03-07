import React, {useState, useEffect, useContext} from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

class MyComponent extends Component {
  handleSelect(ranges){
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  render(){
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
    return (
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
    )
  }
}

// import { Calendar } from 'react-date-range';

// class MyComponent extends Component {
//   handleSelect(date){
//     console.log(date); // native Date object
//   }
//   render(){
//     return (
//       <Calendar
//         date={new Date()}
//         onChange={this.handleSelect}
//       />
//     )
//   }
// }