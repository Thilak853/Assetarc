

import React from "react";

const AssetDetailsModal = ({
  isOpen,
  asset,
  onClose,
  onEdit,
}) => {
  if (
    !isOpen ||
    !asset
  ) {
    return null;
  }

  const health =
    asset.currentHealth ??
    asset.health ??
    asset.healthScore ??
    asset.healthPercentage ??
    "-";

  const status =
    asset.currentStatus ||
    asset.status ||
    "-";

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <div className="modal-header">

          <div>
            <p className="eyebrow">
              ASSET DETAILS
            </p>

            <h2>
              {asset.name ||
                "Industrial Asset"}
            </h2>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

        </div>

        <div className="details-grid">

          <div>
            <span>
              Asset Tag
            </span>

            <strong>
              {asset.assetTag ||
                "-"}
            </strong>
          </div>

          <div>
            <span>
              Category
            </span>

            <strong>
              {asset.category ||
                "-"}
            </strong>
          </div>

          <div>
            <span>
              Status
            </span>

            <strong>
              {status}
            </strong>
          </div>

          <div>
            <span>
              Health
            </span>

            <strong>
              {health}%
            </strong>
          </div>

          <div>
            <span>
              Install Date
            </span>

            <strong>
              {asset.installDate ||
                "-"}
            </strong>
          </div>

          <div>
            <span>
              Purchase Price
            </span>

            <strong>
              {asset.purchasePrice ??
                "-"}
            </strong>
          </div>

          <div>
            <span>
              Expected Lifespan
            </span>

            <strong>
              {asset.expectedLifespanYears
                ? `${asset.expectedLifespanYears} years`
                : "-"}
            </strong>
          </div>

        </div>

        <div className="modal-actions">

          <button
            type="button"
            className="secondary-btn"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="add-btn"
            onClick={onEdit}
          >
            Edit Asset
          </button>

        </div>

      </div>

    </div>
  );
};

export default AssetDetailsModal;