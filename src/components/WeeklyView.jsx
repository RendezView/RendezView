import React, { useState, useEffect } from "react";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import './style/WeeklyView.css'

const WeeklyView = ({ startDate, endDate }) => {
    const [localStartDate, setLocalStartDate] = useState(null);
    const [localEndDate, setLocalEndDate] = useState(null);

    const [config, setConfig] = useState({
        viewType: "Week",
        startDate: localStartDate
    });

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
        setConfig(config => ({...config, startDate: localStartDate}))
      }
    }, [localStartDate, localEndDate])

    return (
      <div className="weekly-view-container">
        <h2 className="weekly-view-heading">Weekly Schedule</h2>
        <div className="weekly-view-calendar">
            <DayPilotCalendar {...config} />
        </div>
        <button className="submitBtn">Submit</button>
      </div>
    );
  };

export default WeeklyView;