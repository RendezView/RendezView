import React, { useState } from "react";
import MonthlyView from './MonthlyView';
import MeetingDetails from './MeetingDetails';
import WeeklyView from './WeeklyView';
import DisplayArea from "./DisplayArea";
import './style/MainComponent.css'

const MainComponent = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [meetingName, setMeetingName] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [meetingLocation, setMeetingLocation] = useState('');

    const handleDefineMeeting = (name, description, location) => {
        setMeetingName(name);
        setMeetingDescription(description);
        setMeetingLocation(location);
    };

    return (
        <div className="mainContainer">
            <div className="leftContainer">
                <MonthlyView setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} />
                <hr />
                <MeetingDetails
                    onDefineMeeting={handleDefineMeeting}
                    meetingName={meetingName}
                    meetingDescription={meetingDescription}
                    meetingLocation={meetingLocation}
                    setMeetingName={setMeetingName}
                    setMeetingDescription={setMeetingDescription}
                    setMeetingLocation={setMeetingLocation}
                />
                <hr />
                <WeeklyView startDate={startDate} endDate={endDate} />
            </div>
            <div className="rightContainer">
                <DisplayArea 
                    meetingName={meetingName} 
                    meetingDescription={meetingDescription} 
                    meetingLocation={meetingLocation} 
                />
            </div>
        </div>
    )
};

export default MainComponent;