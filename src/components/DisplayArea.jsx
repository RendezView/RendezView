import React from "react";
import './style/DisplayArea.css';

const DisplayArea = ({ meetingName, meetingDescription, meetingLocation }) => {
    return (
        <div className="meeting-details-display-container">
            <h2>Meeting Overview</h2>
            <div className="detail-row">
                <strong>Name:</strong>
                <p>{meetingName}</p>
            </div>
            <div className="detail-row">
                <strong>Description:</strong>
                <p>{meetingDescription}</p>
            </div>
            <div className="detail-row">
                <strong>Location:</strong>
                <p>{meetingLocation}</p>
            </div>
        </div>
    );
};

export default DisplayArea;
