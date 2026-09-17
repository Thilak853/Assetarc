
import React from "react";

const StatCards = ({
  stats = {},
}) => {

  return (
    <div className="stat-grid">

      <div className="stat-card">
        <span>
          Assets
        </span>

        <strong>
          {stats.assetCount || 0}
        </strong>
      </div>

      <div className="stat-card">
        <span>
          Health
        </span>

        <strong>
          {stats.averageHealth || 0}%
        </strong>
      </div>

      <div className="stat-card">
        <span>
          Maintenance
        </span>

        <strong>
          {stats.activeMaintenanceCount || 0}
        </strong>
      </div>

      <div className="stat-card">
        <span>
          Fleet Value
        </span>

        <strong>
          ₹{Number(
            stats.totalFleetValue || 0
          ).toLocaleString()}
        </strong>
      </div>

    </div>
  );
};

export default StatCards;