import React, { useState } from "react";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import './style/WeeklyView.css'

const WeeklyView = ({ startDate, endDate }) => {
    const [config, setConfig] = useState({
        viewType: "Week",
    });

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