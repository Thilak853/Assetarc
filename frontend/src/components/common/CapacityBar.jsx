
import React from "react";

const CapacityBar = ({
  value = 0,
}) => {

  const percentage =
    Math.max(
      0,
      Math.min(
        100,
        Number(value)
      )
    );

  return (
    <div className="capacity-bar">

      <div>
        <span>
          Capacity
        </span>

        <strong>
          {percentage}%
        </strong>
      </div>

      <div className="capacity-track">

        <i
          style={{
            width:
              `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
};

export default CapacityBar;