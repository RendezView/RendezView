import React from "react";
import './style/CustomUser.css'

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

const CustomUser = ({ userName, setUserName, userColor, setUserColor }) => {

    return (
        <div className="user-input-container">
            <h2>Who the fuck are you and which fucking color do you want?</h2>
            <input 
            type="text" 
            placeholder="Enter your name" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
            <div className="color-selection">
            {colors.map(color => (
                <button
                key={color}
                className="color-circle"
                style={{ backgroundColor: color }}
                onClick={() => setUserColor(color)}
                aria-label={`Select color ${color}`}
                />
            ))}
            </div>
      </div>
    );
};

export default CustomUser;