import React from "react";
import PropTypes from "prop-types";

import "./card.css";
function Card({  title,content,url, id }) {
  const handleClick = () => {
    window.location.href = url;
  };

  return (
    <div>
      <div
        className="card text-center bg-dark animate__animated animate__fadeInUp"
        style={{
          backgroundColor: "#FFFFFF",
          border: "2px solid #FFFFFF",
          borderRadius: "30px",
        }}
        onClick={handleClick} // Added onClick handler
      >
        <div className="overflow2">
                  <div className="card-body text-light">
            <h4 className="card-title">{title}</h4>
            <h1 className="card-text">{content}</h1>
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