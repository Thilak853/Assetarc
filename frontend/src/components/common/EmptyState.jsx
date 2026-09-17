

import React from "react";

const EmptyState = ({
  title = "Nothing to display",
  message = "No records are currently available.",
}) => {

  return (
    <div className="empty-state">

      <div className="empty-icon">
        ◌
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {message}
      </p>

    </div>
  );
};

export default EmptyState;