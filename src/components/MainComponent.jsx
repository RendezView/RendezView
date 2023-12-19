import React from "react";
import MonthlyView from './MonthlyView';
import MeetingDetails from './MeetingDetails';
import WeeklyView from './WeeklyView';

const MainComponent = () => {

    return (
        <div className="mainContainer">
            <MonthlyView />
            <hr />
            <MeetingDetails />
            {/* code goes here */}
        </div>
    )
};

export default MainComponent;