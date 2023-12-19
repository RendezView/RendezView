import React, { useState } from "react";
import MonthlyView from "./MonthlyView";
import MeetingDetails from "./MeetingDetails";
import WeeklyView from "./WeeklyView";
import DisplayArea from "./DisplayArea";
import CustomUser from "./CustomUser";
import "./style/MainComponent.css";

const MainComponent = () => {

  const colors = [
    '#4169E1', // Royal Blue
    '#FF0000', // Red
    '#FFFF00', // Yellow
    '#228B22', // Forest Green
    '#800080', // Purple
    '#FFC0CB', // Pink
    '#808080', // Gray
    '#87CEEB', // Sky Blue
    '#32CD32', // Lime Green
    '#FFA500'  // Orange
  ];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [organizerName, setOrganizerName] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [userColor, setUserColor] = useState(colors[0]);
  const [userName, setUserName] = useState("");

  const handleDefineMeeting = (organizer, name, description, location) => {
    setOrganizerName(organizer);
    setMeetingName(name);
    setMeetingDescription(description);
    setMeetingLocation(location);
  };

  return (
    <div className="mainContainer">
      <div className="leftContainer">
        <MonthlyView
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
        />
        <hr />
        <MeetingDetails
          onDefineMeeting={handleDefineMeeting}
          organizerName={organizerName}
          meetingName={meetingName}
          meetingDescription={meetingDescription}
          meetingLocation={meetingLocation}
          setOrganizerName={setOrganizerName}
          setMeetingName={setMeetingName}
          setMeetingDescription={setMeetingDescription}
          setMeetingLocation={setMeetingLocation}
        />
        <hr />
        <WeeklyView startDate={startDate} endDate={endDate} />
      </div>
      <div className="rightContainer">
        <DisplayArea
          organizerName={organizerName}
          meetingName={meetingName}
          meetingDescription={meetingDescription}
          meetingLocation={meetingLocation}
        />
        <hr />
        <CustomUser 
          userName={userName}
          setUserName={setUserName}
          userColor={userColor}
          setUserColor={setUserColor}
        />
      </div>
    </div>
  );
};

export default MainComponent;
