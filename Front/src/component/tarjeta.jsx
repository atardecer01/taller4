import React, { useState } from "react";
import PropTypes from "prop-types";

import "./card.css";

function Card({ title, content, url, id }) {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    window.open(url, '_blank');
  };

  const handleMouseOver = () => {
    setShowInfo(true);
  };

  const handleMouseOut = () => {
    setShowInfo(false);
  };

  return (
    <div     >
      <div
        className="card text-center bg-dark animate__animated animate__fadeInUp"
        style={{
          backgroundColor: "#FFFFFF",
          border: "2px solid #FFFFFF",
          borderRadius: "30px",
          width : "30rem"        
        }}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="overflow2">
          <div className="card-body text-light">
          <p style={{
            fontSize: "1.5rem",
            fontFamily: "'Roboto Mono', sans-serif",
            fontWeight: "bold"
          }}>{title}</p>

           
            {showInfo && (
              <div className="tooltip">
                <p style={{
            fontSize: "1.5rem",
            fontFamily: "'Roboto Mono', monospace",
         
          }}>{content}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.string,
};

export default Card;
