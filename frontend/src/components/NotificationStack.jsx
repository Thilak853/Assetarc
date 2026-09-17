
import React from "react";

const NotificationStack = ({
  notifications = [],
}) => {

  return (
    <div className="notification-stack">

      {notifications.map(
        (notification, index) => (

          <div
            className="notification"
            key={
              notification.id ||
              index
            }
          >
            {notification.message}
          </div>

        )
      )}

    </div>
  );
};

export default NotificationStack;