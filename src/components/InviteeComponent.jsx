import React, { useState } from 'react';
import WeeklyView from './WeeklyView';
import CustomUser from './CustomUser';
import DisplayArea from './DisplayArea';

const InviteeComponent = () => {

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
  // You'll need to manage state and functions similar to those in MainComponent
  // or find a way to share them between components
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [organizerName, setOrganizerName] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [userColor, setUserColor] = useState(colors[0]);
  const [userName, setUserName] = useState("");
  const [generatedLink, setGeneratedLink] = useState(null);

  return (
    <div className="mainContainer">
      <div className="leftContainer">
          <div>
            <WeeklyView
              startDate={startDate} 
              endDate={endDate} 
              userColor={userColor}
              userName={userName}
              organizerName={organizerName}
              meetingName={meetingName}
              meetingLocation={meetingLocation}
              meetingDescription={meetingDescription}
              generatedLink={generatedLink}
              setGeneratedLink={setGeneratedLink}
            />
          </div>
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

export default InviteeComponent;

