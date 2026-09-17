


import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api";

const LogMaintenanceModal = ({
  isOpen = false,
  onClose = () => {},
  onCompleted = () => {},
  onSuccess = () => {},
  schedule = null,
  maintenance = null,
}) => {

  const currentSchedule =
    schedule || maintenance;

  const [
    completionNotes,
    setCompletionNotes
  ] = useState("");

  const [
    costIncurred,
    setCostIncurred
  ] = useState("");

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    error,
    setError
  ] = useState("");

  const [
    success,
    setSuccess
  ] = useState("");

  useEffect(() => {

    if (!isOpen) {
      return;
    }

    setCompletionNotes("");
    setCostIncurred("");
    setError("");
    setSuccess("");
    setLoading(false);

  }, [isOpen, currentSchedule]);

  if (!isOpen) {
    return null;
  }

  const scheduleId =
    currentSchedule?.id ??
    currentSchedule?.scheduleId ??
    currentSchedule?.maintenanceScheduleId ??
    currentSchedule?.maintenance_schedule_id ??
    null;

  const assetId =
    currentSchedule?.asset?.id ??
    currentSchedule?.assetId ??
    currentSchedule?.asset_id ??
    null;

  const assetTag =
    currentSchedule?.asset?.assetTag ??
    currentSchedule?.asset?.asset_tag ??
    currentSchedule?.assetTag ??
    currentSchedule?.asset_tag ??
    "Industrial Asset";

  const getToken = () => {

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken")
    );
  };

  // =========================================================
  // COMPLETE
  // =========================================================

  const handleComplete = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      scheduleId === null ||
      scheduleId === undefined ||
      scheduleId === ""
    ) {

      setError(
        "Maintenance schedule ID is missing."
      );

      return;
    }

    const numericScheduleId =
      Number(scheduleId);

    if (
      !Number.isInteger(
        numericScheduleId
      ) ||
      numericScheduleId <= 0
    ) {

      setError(
        "Invalid maintenance schedule ID."
      );

      return;
    }

    if (
      !completionNotes.trim()
    ) {

      setError(
        "Please enter completion notes."
      );

      return;
    }

    let numericCost = 0;

    if (costIncurred !== "") {

      numericCost =
        Number(costIncurred);

      if (
        !Number.isFinite(
          numericCost
        ) ||
        numericCost < 0
      ) {

        setError(
          "Please enter a valid maintenance cost."
        );

        return;
      }
    }

    setLoading(true);

    try {

      const token =
        getToken();

      const payload = {

        scheduleId:
          numericScheduleId,

        assetId:
          assetId !== null &&
          assetId !== undefined &&
          assetId !== ""
            ? Number(assetId)
            : null,

        workDescription:
          completionNotes.trim(),

        completionNotes:
          completionNotes.trim(),

        notes:
          completionNotes.trim(),

        costIncurred:
          numericCost

      };

      console.log(
        "Completing maintenance:",
        payload
      );

      let response;

      if (token) {

        response =
          await axios.post(
            `${API}/maintenance/complete`,
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
            `${API}/maintenance/complete`,
            payload
          );
      }

      console.log(
        "Maintenance completion response:",
        response?.data
      );

      setSuccess(
        "Maintenance task completed successfully."
      );

      // -------------------------------------------------------
      // REFRESH MAINTENANCE TABLE
      // -------------------------------------------------------

      if (
        typeof onCompleted ===
        "function"
      ) {

        await onCompleted(
          response?.data
        );
      }

      if (
        typeof onSuccess ===
        "function"
      ) {

        await onSuccess(
          response?.data
        );
      }

      // -------------------------------------------------------
      // CLOSE
      // -------------------------------------------------------

      setTimeout(() => {

        setCompletionNotes("");
        setCostIncurred("");
        setError("");
        setSuccess("");

        if (
          typeof onClose ===
          "function"
        ) {

          onClose();
        }

      }, 700);

    } catch (err) {

      console.error(
        "Maintenance completion failed:",
        err
      );

      let message =
        "Unable to complete maintenance task.";

      if (
        err?.response?.data
      ) {

        if (
          typeof err.response.data ===
          "string"
        ) {

          message =
            err.response.data;

        } else if (
          err.response.data.message
        ) {

          message =
            err.response.data.message;

        } else if (
          err.response.data.error
        ) {

          message =
            err.response.data.error;
        }
      }

      else if (
        err?.code ===
        "ERR_NETWORK"
      ) {

        message =
          "Backend server is not running on port 8080.";
      }

      else if (
        err?.message
      ) {

        message =
          err.message;
      }

      setError(message);

    } finally {

      setLoading(false);
    }
  };

  // =========================================================
  // CANCEL
  // =========================================================

  const handleCancel = () => {

    if (loading) {
      return;
    }

    setCompletionNotes("");
    setCostIncurred("");
    setError("");
    setSuccess("");

    onClose();
  };

  // =========================================================
  // UI
  // =========================================================

  return (

    <div
      className="modal-overlay maintenance-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-modal-title"
    >

      <div className="maintenance-modal">

        <div className="modal-header">

          <div>

            <span className="modal-eyebrow">
              MAINTENANCE LOG
            </span>

            <h2 id="maintenance-modal-title">
              Complete Maintenance Task
            </h2>

            <p>
              Record the completion details for
              this maintenance task.
            </p>

          </div>

          <button
            type="button"
            className="modal-close"
            onClick={handleCancel}
            disabled={loading}
            aria-label="Close"
          >
            ×
          </button>

        </div>

        <form
          className="maintenance-complete-form"
          onSubmit={handleComplete}
        >

          <div className="maintenance-info">

            <span className="info-label">
              Asset
            </span>

            <strong>
              {assetTag}
            </strong>

          </div>

          {currentSchedule?.maintenanceType && (

            <div className="maintenance-info">

              <span className="info-label">
                Maintenance Type
              </span>

              <strong>
                {currentSchedule.maintenanceType}
              </strong>

            </div>

          )}

          {currentSchedule?.priority && (

            <div className="maintenance-info">

              <span className="info-label">
                Priority
              </span>

              <strong>
                {currentSchedule.priority}
              </strong>

            </div>

          )}

          {scheduleId && (

            <div className="maintenance-info">

              <span className="info-label">
                Schedule ID
              </span>

              <strong>
                {scheduleId}
              </strong>

            </div>

          )}

          <div className="form-group">

            <label htmlFor="completionNotes">
              Completion Notes
            </label>

            <textarea
              id="completionNotes"
              name="completionNotes"
              placeholder="Enter completion notes..."
              value={completionNotes}
              onChange={(event) => {

                setCompletionNotes(
                  event.target.value
                );

                setError("");
                setSuccess("");

              }}
              rows={5}
              disabled={loading}
            />

          </div>

          <div className="form-group">

            <label htmlFor="costIncurred">
              Maintenance Cost
            </label>

            <input
              id="costIncurred"
              name="costIncurred"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter maintenance cost"
              value={costIncurred}
              onChange={(event) => {

                setCostIncurred(
                  event.target.value
                );

                setError("");
                setSuccess("");

              }}
              disabled={loading}
            />

          </div>

          {error && (

            <div
              className="form-error"
              role="alert"
            >
              {error}
            </div>

          )}

          {success && (

            <div
              className="form-success"
              role="status"
            >
              {success}
            </div>

          )}

          <div className="modal-actions">

            <button
              type="button"
              className="secondary-btn"
              onClick={handleCancel}
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
                ? "Completing..."
                : "Complete Task"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default LogMaintenanceModal;