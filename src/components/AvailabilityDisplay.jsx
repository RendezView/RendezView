import React from "react";
import './style/AvailabilityDisplay.css'

const AvailabilityDisplay = ({ selectedRanges, onDelete }) => {
    return (
      <div className="selected-ranges-display">
        <h3>Selected Time Ranges</h3>
        {selectedRanges.length > 0 ? (
          <ul>
            {selectedRanges.map((range, index) => (
                <li key={index}>
                    <div className="range-details">
                        <strong>User:</strong> {range.userName || 'Anonymous'}
                        <br />
                        <strong>Start:</strong> {new Date(range.start).toLocaleString()}
                        <br />
                        <strong>End:</strong> {new Date(range.end).toLocaleString()}
                    </div>
                    <button onClick={() => onDelete(index)} className="delete-range-button">Delete</button>
                </li>
            ))}
          </ul>
        ) : (
          <p>No time ranges selected</p>
        )}
      </div>
    );
};
  
export default AvailabilityDisplay;
  