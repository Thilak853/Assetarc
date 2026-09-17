

import React from "react";

const ErrorHandler = ({
  message,
}) => {
  if (!message) {
    return null;
  }

  return (
    <div className="error-message">
      {message}
    </div>
  );
};

export default ErrorHandler;