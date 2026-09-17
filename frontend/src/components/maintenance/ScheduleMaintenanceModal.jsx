


import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  createSchedule,
} from "../../store/slices/maintenanceSlice";

const ScheduleMaintenanceModal = ({
  isOpen,
  onClose,
  asset = null,
}) => {
  const dispatch =
    useDispatch();

  const assetsState =
    useSelector(
      (state) =>
        state?.assets || {}
    );

  const assets =
    Array.isArray(
      assetsState.assets
    )
      ? assetsState.assets
      : [];

  const [
    assetId,
    setAssetId,
  ] = useState(
    asset?.id || ""
  );

  const [
    plannedDate,
    setPlannedDate,
  ] = useState("");

  const [
    maintenanceType,
    setMaintenanceType,
  ] = useState(
    "ROUTINE"
  );

  const [
    priority,
    setPriority,
  ] = useState(
    "MEDIUM"
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    if (asset?.id) {
      setAssetId(
        asset.id
      );
    }
  }, [asset]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit =
    async (
      event
    ) => {
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

      try {
        setLoading(
          true
        );

        await dispatch(
          createSchedule({
            assetId:
              Number(
                assetId
              ),

            plannedDate,

            maintenanceType,

            priority,
          })
        ).unwrap();

        setPlannedDate("");

        setMaintenanceType(
          "ROUTINE"
        );

        setPriority(
          "MEDIUM"
        );

        onClose();
      } catch (err) {
        setError(
          typeof err ===
            "string"
            ? err
            : "Failed to schedule maintenance."
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <div className="modal-header">

          <div>
            <p className="eyebrow">
              MAINTENANCE SCHEDULER
            </p>

            <h2>
              Schedule Maintenance
            </h2>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <form
          className="modal-form"
          onSubmit={
            handleSubmit
          }
        >

          <label>
            <span>
              Asset
            </span>

            {asset ? (
              <input
                type="text"
                value={
                  asset.assetTag ||
                  asset.name ||
                  asset.id ||
                  ""
                }
                disabled
                readOnly
              />
            ) : (
              <select
                value={
                  assetId
                }
                onChange={(
                  event
                ) =>
                  setAssetId(
                    event
                      .target
                      .value
                  )
                }
              >
                <option value="">
                  Select Asset
                </option>

                {assets.map(
                  (
                    item
                  ) => (
                    <option
                      key={
                        item.id
                      }
                      value={
                        item.id
                      }
                    >
                      {item.assetTag ||
                        item.name ||
                        `Asset ${item.id}`}
                    </option>
                  )
                )}
              </select>
            )}
          </label>

          <label>
            <span>
              Planned Date
            </span>

            <input
              type="date"
              value={
                plannedDate
              }
              onChange={(
                event
              ) =>
                setPlannedDate(
                  event
                    .target
                    .value
                )
              }
            />
          </label>

          <label>
            <span>
              Maintenance Type
            </span>

            <select
              value={
                maintenanceType
              }
              onChange={(
                event
              ) =>
                setMaintenanceType(
                  event
                    .target
                    .value
                )
              }
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
          </label>

          <label>
            <span>
              Priority
            </span>

            <select
              value={
                priority
              }
              onChange={(
                event
              ) =>
                setPriority(
                  event
                    .target
                    .value
                )
              }
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
            </select>
          </label>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="modal-actions">

            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-btn"
              disabled={
                loading
              }
            >
              {loading
                ? "Scheduling..."
                : "Schedule Maintenance"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ScheduleMaintenanceModal;