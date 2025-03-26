import React, { useState, useEffect } from "react";
import "./Alert.css";

const Alert = ({ message }) => {
  const [alertMessage, setAlertMessage] = useState(message);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    alertMessage && (
      <div className="alert-container">
        <div className="alert-message">
         {alertMessage}
        </div>
      </div>
    )
  );
};

export default Alert;
