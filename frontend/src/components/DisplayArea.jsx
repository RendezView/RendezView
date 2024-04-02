import React from "react";
import { Link } from 'react-router-dom';
import './style/DisplayArea.css';

const DisplayArea = ({ organizerName, meetingName, meetingDescription, meetingLocation, generatedLink }) => {
    return (
        <div className="meeting-details-display-container">
            <h2>Meeting Overview</h2>
            <div className="detail-row">
                <strong>Organizer Name:</strong>
                <p>{organizerName}</p>
            </div>
            <div className="detail-row">
                <strong>Meeting Name:</strong>
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
            <div className="detail-row">
                <strong>Link:</strong>
                <a aria-label="link to invitee component" href={generatedLink}>{generatedLink}</a>
                {/* <Link aria-label="link to invitee component" to="/availability">{generatedLink}</Link> */}
            </div>
        </div>
    );
};

export default DisplayArea;
