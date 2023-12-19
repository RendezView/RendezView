import React, { useState } from "react";
import MonthlyView from "./MonthlyView";
import MeetingDetails from "./MeetingDetails";
import WeeklyView from "./WeeklyView";
import DisplayArea from "./DisplayArea";
import CustomUser from "./CustomUser";
import "./style/MainComponent.css";

const MainComponent = () => {

  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF',
    '#8A2BE2', '#FF7F50', '#6495ED', '#DC143C', '#008B8B'
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
