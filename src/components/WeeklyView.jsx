import React, { useState, useEffect } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import './style/WeeklyView.css'
import AvailabilityDisplay from "./AvailabilityDisplay";

const WeeklyView = ({ startDate, endDate, userColor, userName }) => {
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
      const rangeWithUser = {
        start: args.start.value,
        end: args.end.value,
        userName: userName
    };
      // console.log('Time range selected: ', args.start, args.end);
      setSelectedRanges(prevRanges => [...prevRanges, rangeWithUser]);
      console.log('selectedRanges: ', selectedRanges);
    }

    return (
      <div>
        <div className="weekly-view-container">
          <h2 className="weekly-view-heading">Weekly Schedule</h2>
          <div className="weekly-view-calendar">
              <DayPilotCalendar {...config} onTimeRangeSelect={args => handleTimeRangeSelect(args)} />
          </div>
          <button className="submitBtn">Submit</button>
        </div>
        <AvailabilityDisplay selectedRanges={selectedRanges}/>
      </div>
    );
  };

export default WeeklyView;
