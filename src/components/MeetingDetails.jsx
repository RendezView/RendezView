import React, { useState } from "react";
import './style/MeetingDetails.css';

const MeetingDetails = () => { // destruction onDefineMeeting from props here - { onDefineMeeting }
    const [meetingName, setMeetingName] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [meetingLocation, setMeetingLocation] = useState('');
    
    function clickHandler() {
        // put a function in main component to set these details inside some state up in that component, pass function down through props
        // something like
        // onDefineMeeting({meetingName, meetingDescription, meetingLocation});
    }

    return (
        // flex display vertically on this div
        <div className="meeting-details-container">
            <h2>Meeting Details</h2>
            <label>Meeting Name:</label>
            <input type="text" value={meetingName} onChange={(e) => setMeetingName(e.target.value)} />
            <label>Meeting Description:</label>
            <textarea value={meetingDescription} onChange={(e) => setMeetingDescription(e.target.value)} />
            <label>Location:</label>
            <input type="text" value={meetingLocation} onChange={(e) => setMeetingLocation(e.target.value)} />
            <button onClick={clickHandler}>Submit</button>
        </div>
    );
};

export default MeetingDetails;
