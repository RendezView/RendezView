import React from "react";
import './style/DisplayArea.css'

const DisplayArea = ({ meetingName, meetingDescription, meetingLocation }) => {

    return (
        <div className="meeting-details-display-container">
            <h2>Meeting Overview</h2>
            <p><strong>Name:</strong> {meetingName}</p>
            <p><strong>Description:</strong> {meetingDescription}</p>
            <p><strong>Location:</strong> {meetingLocation}</p>
        </div>
    );
};

export default DisplayArea;