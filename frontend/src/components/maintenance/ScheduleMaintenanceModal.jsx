

import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api";

const ScheduleMaintenanceModal = ({
  isOpen = false,
  onClose = () => {},
  onSuccess = () => {}
}) => {

  const [assets, setAssets] = useState([]);

  const [assetId, setAssetId] =
    useState("");

  const [plannedDate, setPlannedDate] =
    useState("");

  const [maintenanceType, setMaintenanceType] =
    useState("ROUTINE");

  const [priority, setPriority] =
    useState("LOW");

  const [loading, setLoading] =
    useState(false);

  const [assetsLoading, setAssetsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  // =========================================================
  // LOAD ASSETS
  // =========================================================

  useEffect(() => {

    if (!isOpen) {
      return;
    }

    const loadAssets = async () => {

      try {

        setAssetsLoading(true);
        setError("");

        let response;

        if (token) {

          response =
            await axios.get(
              `${API}/assets`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

        } else {

          response =
            await axios.get(
              `${API}/assets`
            );
        }

        const data =
          Array.isArray(response?.data)
            ? response.data
            : [];

        setAssets(data);

      } catch (err) {

        console.error(
          "Failed to load assets:",
          err
        );

        setError(
          "Unable to load assets."
        );

      } finally {

        setAssetsLoading(false);
      }
    };

    loadAssets();

    // Reset fields
    setAssetId("");
    setPlannedDate("");
    setMaintenanceType("ROUTINE");
    setPriority("LOW");
    setError("");

  }, [isOpen]);

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    if (!assetId) {

      setError(
        "Please select an asset."
      );

      return;
    }

    if (!plannedDate) {

      setError(
        "Please select a planned date."
      );

      return;
    }

    setLoading(true);

    try {

      const payload = {

        assetId:
          Number(assetId),

        plannedDate:
          plannedDate,

        maintenanceType:
          maintenanceType,

        priority:
          priority

      };

      let response;

      if (token) {

        response =
          await axios.post(
            `${API}/maintenance/schedule`,
            payload,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
                "Content-Type":
                  "application/json"
              }
            }
          );

      } else {

        response =
          await axios.post(
            `${API}/maintenance/schedule`,
            payload
          );
      }

      console.log(
        "Maintenance schedule created:",
        response?.data
      );

      if (
        typeof onSuccess ===
        "function"
      ) {

        await onSuccess(
          response?.data
        );
      }

      if (
        typeof onClose ===
        "function"
      ) {

        onClose();
      }

    } catch (err) {

      console.error(
        "Schedule creation failed:",
        err
      );

      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        "Unable to create maintenance schedule."
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================================================
  // CLOSED
  // =========================================================

  if (!isOpen) {

    return null;
  }

  // =========================================================
  // UI
  // =========================================================

  return (

    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
    >

      <div className="maintenance-modal">

        <div className="modal-header">

          <div>

            <span className="modal-eyebrow">
              MAINTENANCE CONTROL
            </span>

            <h2>
              Add Maintenance Schedule
            </h2>

            <p>
              Create a new maintenance task
              for an industrial asset.
            </p>

          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="maintenance-complete-form"
        >

          {/* =================================================
              ASSET
          ================================================= */}

          <div className="form-group">

            <label htmlFor="scheduleAsset">
              Asset
            </label>

            <select
              id="scheduleAsset"
              value={assetId}
              onChange={(event) =>
                setAssetId(
                  event.target.value
                )
              }
              disabled={
                loading ||
                assetsLoading
              }
            >

              <option value="">
                {assetsLoading
                  ? "Loading assets..."
                  : "Select an asset"}
              </option>

              {assets.map((asset) => (

                <option
                  key={asset.id}
                  value={asset.id}
                >

                  {asset.assetTag ||
                    asset.asset_tag ||
                    `Asset ${asset.id}`}

                  {" - "}

                  {asset.name || ""}

                </option>

              ))}

            </select>

          </div>

          {/* =================================================
              PLANNED DATE
          ================================================= */}

          <div className="form-group">

            <label htmlFor="plannedDate">
              Planned Date
            </label>

            <input
              id="plannedDate"
              name="plannedDate"
              type="date"
              value={plannedDate}
              onChange={(event) =>
                setPlannedDate(
                  event.target.value
                )
              }
              disabled={loading}
            />

          </div>

          {/* =================================================
              MAINTENANCE TYPE
          ================================================= */}

          <div className="form-group">

            <label htmlFor="maintenanceType">
              Maintenance Type
            </label>

            <select
              id="maintenanceType"
              value={maintenanceType}
              onChange={(event) =>
                setMaintenanceType(
                  event.target.value
                )
              }
              disabled={loading}
            >

              <option value="ROUTINE">
                Routine
              </option>

              <option value="REPAIR">
                Repair
              </option>

              <option value="INSPECTION">
                Inspection
              </option>

            </select>

          </div>

          {/* =================================================
              PRIORITY
          ================================================= */}

          <div className="form-group">

            <label htmlFor="priority">
              Priority
            </label>

            <select
              id="priority"
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target.value
                )
              }
              disabled={loading}
            >

              <option value="LOW">
                Low
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="HIGH">
                High
              </option>

              <option value="CRITICAL">
                Critical
              </option>

            </select>

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div
              className="form-error"
              role="alert"
            >
              {error}
            </div>

          )}

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="modal-actions">

            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >

              {loading
                ? "Creating..."
                : "Create Schedule"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ScheduleMaintenanceModal;