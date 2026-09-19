import React from "react";

const MaintenanceDetailsModal = ({
  isOpen = false,
  schedule = null,
  status = "PENDING",
  onClose = () => {}
}) => {
  if (!isOpen || !schedule) {
    return null;
  }

  const asset = schedule.asset || {};
  const assetTag =
    asset.assetTag ||
    schedule.assetTag ||
    asset.asset_tag ||
    schedule.asset_tag ||
    "Unknown Asset";

  const details = [
    ["Asset", assetTag],
    ["Planned Date", schedule.plannedDate || "-"],
    ["Maintenance Type", schedule.maintenanceType || "-"],
    ["Priority", schedule.priority || "-"],
    ["Status", status],
    ["Schedule ID", schedule.id ?? schedule.scheduleId ?? "-"]
  ];

  return (
    <div className="modal-overlay" role="presentation">
      <div className="maintenance-modal" role="dialog" aria-modal="true" aria-labelledby="maintenance-details-title">
        <div className="modal-header">
          <div>
            <p className="modal-eyebrow">MAINTENANCE DETAILS</p>
            <h2 id="maintenance-details-title">{assetTag}</h2>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close maintenance details"
          >
            ×
          </button>
        </div>

        <div className="details-grid">
          {details.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetailsModal;
