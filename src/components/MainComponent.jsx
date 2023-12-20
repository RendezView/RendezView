import React, { useState } from "react";
import MonthlyView from "./MonthlyView";
import MeetingDetails from "./MeetingDetails";
import WeeklyView from "./WeeklyView";
import DisplayArea from "./DisplayArea";
import CustomUser from "./CustomUser";
import "./style/MainComponent.css";

const MainComponent = () => {

  const colors = [
    '#ececec', // Light Gray (Base: First Color)
    '#c7c7c7', // Medium Gray (Tint of First Color)
    '#9fd3c7', // Light Teal (Base: Second Color)
    '#76b0a1', // Medium Teal (Shade of Second Color)
    '#385170', // Dark Blue-Gray (Base: Third Color)
    '#2c3f56', // Deeper Blue-Gray (Shade of Third Color)
    '#142d4c', // Navy Blue (Base: Fourth Color)
    '#0f2339', // Darker Navy (Shade of Fourth Color)
    '#e3e7e8', // Lighter Gray (Tint of First Color)
    '#6a7b82'  // Medium Blue-Gray (Tint of Third Color)
  ];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [organizerName, setOrganizerName] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [userColor, setUserColor] = useState(colors[0]);
  const [userName, setUserName] = useState("");

  const [showMonthlyView, setShowMonthlyView] = useState(true);
  const [showMeetingDetails, setShowMeetingDetails] = useState(true);
  const [showWeeklyView, setShowWeeklyView] = useState(false);

  const handleDefineMeeting = (organizer, name, description, location) => {
    setOrganizerName(organizer);
    setMeetingName(name);
    setMeetingDescription(description);
    setMeetingLocation(location);
  };

  const toggleMonthlyView = () => setShowMonthlyView(!showMonthlyView);
  const toggleMeetingDetails = () => setShowMeetingDetails(!showMeetingDetails);
  const toggleWeeklyView = () => setShowWeeklyView(!showWeeklyView);

  const MinimalView = ({ title, toggleFunction }) => (
    <div className="minimal-view">
      <h3>{title}</h3>
      <button className="toggle-button" onClick={toggleFunction}>
        ▼
      </button>
    </div>
  );  

  return (
    <div className="mainContainer">
      <div className="leftContainer">
        {showMonthlyView ? (
          <div>
            <button className="toggle-button" onClick={toggleMonthlyView}>
              ▲ Monthly View
            </button>
            <MonthlyView
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startDate={startDate}
              endDate={endDate}
              onNextClick={toggleMonthlyView}
              />
          </div>
        ) : (
          <MinimalView title="Monthly View" toggleFunction={toggleMonthlyView} />
        )}
        <hr />
  
        {showMeetingDetails ? (
          <div>
            <button className="toggle-button" onClick={toggleMeetingDetails}>
              ▲ Meeting Details
            </button>
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
              onNextClick={toggleMeetingDetails}
              readyForWeek={toggleWeeklyView}
              />
          </div>
        ) : (
          <MinimalView title="Meeting Details" toggleFunction={toggleMeetingDetails} />
        )}
        <hr />
  
        {showWeeklyView ? (
          <div>
            <button className="toggle-button" onClick={toggleWeeklyView}>
              ▲ Weekly View
            </button>
            <WeeklyView
              startDate={startDate} 
              endDate={endDate} 
              userColor={userColor}
              userName={userName}
              organizerName={organizerName}
              meetingName={meetingName}
              meetingLocation={meetingLocation}
              meetingDescription={meetingDescription}
            />
          </div>
        ) : (
          <MinimalView title="Weekly View" toggleFunction={toggleWeeklyView} />
        )}
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

