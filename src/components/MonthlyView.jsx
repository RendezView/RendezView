import React from "react";
// import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import './style/MonthlyView.css';

const MonthlyView = ({ setStartDate, setEndDate, startDate, endDate }) => {
  // if(startDate){
  //   console.log(startDate['$d'].toLocaleDateString('en-US'));
  // }
  // if(endDate){
  //   console.log(endDate['$d'].toLocaleDateString('en-US'));
  // }

  const handleClick = () => {
    console.log('Start Date: ', startDate['$d'].toLocaleDateString('en-US'));
    console.log('End Date: ', endDate['$d'].toLocaleDateString('en-US'));
    setStartDate(startDate);
    setEndDate(endDate);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="monthly-view-container">
        <h1 className="monthly-view-heading">Choose Meeting Dates</h1>
        <div className="monthly-view-calendar">
          <h2>Start Date</h2>
          <DateCalendar value={startDate} onChange={setStartDate} />
          <h2>End Date</h2>
          <DateCalendar value={endDate} onChange={setEndDate} />
        </div>
        <button className="submitBtn" onClick={handleClick}>Submit</button>
      </div>
    </LocalizationProvider>
  );
};

export default MonthlyView;


// import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// export default function DateCalendarValue() {
//   const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateCalendar', 'DateCalendar']}>
//         <DemoItem label="Uncontrolled calendar">
//           <DateCalendar defaultValue={dayjs('2022-04-17')} />
//         </DemoItem>
//         <DemoItem label="Controlled calendar">
//           <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }


/* Multiple date picker
import * as React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import PickersDay from "@mui/lab/PickersDay";
import startOfDay from "date-fns/startOfDay";

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "selected"
})(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark
    },
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%"
  })
}));

export default function MultiDatePicker() {
  const [values, setValues] = React.useState([startOfDay(new Date())]);

  const findDate = (dates, date) => {
    const dateTime = date.getTime();
    return dates.find((item) => item.getTime() === dateTime);
  };

  const findIndexDate = (dates, date) => {
    const dateTime = date.getTime();
    return dates.findIndex((item) => item.getTime() === dateTime);
  };

  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!values) {
      return <PickersDay {...pickersDayProps} />;
    }

    const selected = findDate(values, date);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        selected={selected}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={values}
        onChange={(newValue) => {
          //copying the values array 
          const array = [...values];
          const date = startOfDay(newValue);
          const index = findIndexDate(array, date);
          if (index >= 0) {
            array.splice(index, 1);
          } else {
            array.push(date);
          }
          setValues(array);
        }}
        renderDay={renderPickerDay}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
}
*/