import React from "react";
import './style/CustomUser.css'

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

const CustomUser = ({ userName, setUserName, userColor, setUserColor }) => {

    return (
        <div className="user-input-container">
            <h2>Please complete the following before selecting your availability:</h2>
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