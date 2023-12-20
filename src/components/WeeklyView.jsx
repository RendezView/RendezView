import React, { useState, useEffect } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import './style/WeeklyView.css'

const WeeklyView = ({ startDate, endDate, userColor }) => {
    const [localStartDate, setLocalStartDate] = useState(null);
    const [localEndDate, setLocalEndDate] = useState(null);
    const [selectedRanges, setSelectedRanges] = useState([]);
    const [config, setConfig] = useState({
        viewType: "Days",
        days: 7,
        startDate: localStartDate,
    });

    const amountOfDays = (localStartDate, localEndDate) => {
      const start = new Date(localStartDate);
      const end = new Date(localEndDate);

      const diff = end - start;
      return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
    }

    useEffect(() => {
      if(startDate){
        setLocalStartDate(startDate['$d'].toJSON().split('T')[0]);
      }
      if(endDate){
        setLocalEndDate(endDate['$d'].toJSON().split('T')[0]);
      }
    }, [startDate, endDate]);

    useEffect(() => {
      if(localStartDate){
        setConfig(config => ({...config, startDate: localStartDate, days: amountOfDays(localStartDate, localEndDate)}))
      }
    }, [localStartDate, localEndDate])

    const handleTimeRangeSelect = (args) => {
      console.log('Time range selected: ', args.start, args.end);
      setSelectedRanges(prevRanges => [...prevRanges, [args.start.value, args.end.value]]);
      console.log('selectedRanges: ', selectedRanges);
    }
/*  const handleTimeRangeSelected = (args) => {
    // Specify the color you want to use for the selected cells
    const selectedColor = "lightblue";

    // Update the properties of the selected cells
    const updatedCells = {
      start: args.start,
      end: args.end,
      backColor: selectedColor,
    };

    // Save the selected range in state
    setSelectedRange(updatedCells);

    // Clear the selection after updating the cells
    args.control.clearSelection();
  };
*/
    return (
      <div className="weekly-view-container">
        <h2 className="weekly-view-heading">Weekly Schedule</h2>
        <div className="weekly-view-calendar">
            <DayPilotCalendar {...config} onTimeRangeSelect={args => handleTimeRangeSelect(args)} />
        </div>
        <button className="submitBtn">Submit</button>
      </div>
    );
  };

export default WeeklyView;

/*import React, { useState, useEffect } from "react";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import './style/WeeklyView.css';

const WeeklyView = ({ startDate, endDate, userColor }) => {
  const [localStartDate, setLocalStartDate] = useState(null);
  const [localEndDate, setLocalEndDate] = useState(null);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [selectedColor, setSelectedColor] = useState("lightblue"); // Step 1

  const [config, setConfig] = useState({
    viewType: "Days",
    days: 7,
    startDate: localStartDate,
  });

  const amountOfDays = (localStartDate, localEndDate) => {
    const start = new Date(localStartDate);
    const end = new Date(localEndDate);

    const diff = end - start;
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  useEffect(() => {
    if (startDate) {
      setLocalStartDate(startDate['$d'].toJSON().split('T')[0]);
    }
    if (endDate) {
      setLocalEndDate(endDate['$d'].toJSON().split('T')[0]);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (localStartDate) {
      setConfig(config => ({ ...config, startDate: localStartDate, days: amountOfDays(localStartDate, localEndDate) }));
    }
  }, [localStartDate, localEndDate]);

  const handleTimeRangeSelect = (args) => {
    // Step 2: Update selected color and add selected range
    setSelectedColor("lightblue"); // You can customize this based on your logic
    setSelectedRanges(prevRanges => [...prevRanges, { start: args.start.value, end: args.end.value }]);
  };
  return (
    <div className="weekly-view-container">
      <h2 className="weekly-view-heading">Weekly Schedule</h2>
      <div className="weekly-view-calendar">
        {/* Step 3: Pass selected color as a prop */
//         <DayPilotCalendar {...config} onTimeRangeSelect={args => handleTimeRangeSelect(args)} userColor={selectedColor} />
//       </div>
//       <button className="submitBtn">Submit</button>
//     </div>
//   );
// };

// export default WeeklyView;
