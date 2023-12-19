import React, { useState } from "react";
import './style/MeetingDetails.css';

const MeetingDetails = ({ onDefineMeeting }) => {
    const [localMeetingName, setLocalMeetingName] = useState('');
    const [localMeetingDescription, setLocalMeetingDescription] = useState('');
    const [localMeetingLocation, setLocalMeetingLocation] = useState('');

    const clickHandler = () => {
        onDefineMeeting(localMeetingName, localMeetingDescription, localMeetingLocation);
        setLocalMeetingName('');
        setLocalMeetingDescription('');
        setLocalMeetingLocation('');
    };

    return (
        <div className="meeting-details-container">
            <h2>Meeting Details</h2>
            <label>Meeting Name:</label>
            <input 
              type="text" 
              value={localMeetingName} 
              onChange={(e) => setLocalMeetingName(e.target.value)} 
            />
            <label>Meeting Description:</label>
            <textarea 
              value={localMeetingDescription} 
              onChange={(e) => setLocalMeetingDescription(e.target.value)} 
            />
            <label>Location:</label>
            <input 
              type="text" 
              value={localMeetingLocation} 
              onChange={(e) => setLocalMeetingLocation(e.target.value)} 
            />
            <button onClick={clickHandler}>Submit</button>
        </div>
    );
};

export default MeetingDetails;
