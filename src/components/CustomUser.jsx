import React from "react";
import './style/CustomUser.css'

const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF',
    '#8A2BE2', '#FF7F50', '#6495ED', '#DC143C', '#008B8B'
  ];
  
const CustomUser = ({ userName, setUserName, userColor, setUserColor }) => {

    return (
        <div className="user-input-container">
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