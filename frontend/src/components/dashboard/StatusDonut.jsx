
import React from "react";

const StatusDonut = ({
  active = 72,
  maintenance = 18,
  decommissioned = 10,
}) => {

  return (
    <div className="status-donut">

      <div className="donut-inner">

        <strong>
          {active}%
        </strong>

        <span>
          Active
        </span>

      </div>

      <div className="donut-legend">

        <span>
          <i />
          Active {active}%
        </span>

        <span>
          <i />
          Maintenance {maintenance}%
        </span>

        <span>
          <i />
          Decommissioned {decommissioned}%
        </span>

      </div>

    </div>
  );
};

export default StatusDonut;