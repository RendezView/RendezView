import React from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './style/MonthlyView.css';

const MonthlyView = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="monthly-view-container">
        <h1 className="monthly-view-heading">Choose Meeting Dates</h1>
        <div className="monthly-view-calendar">
          <DateCalendar />
        </div>
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