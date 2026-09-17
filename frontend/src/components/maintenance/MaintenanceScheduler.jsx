

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import LogMaintenanceModal from "./LogMaintenanceModal";
import ScheduleMaintenanceModal from "./ScheduleMaintenanceModal";

const API = "http://localhost:8080/api";

const MaintenanceScheduler = () => {

  const [schedules, setSchedules] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [
    selectedSchedule,
    setSelectedSchedule
  ] = useState(null);

  const [
    showCompleteModal,
    setShowCompleteModal
  ] = useState(false);

  const [
    showScheduleModal,
    setShowScheduleModal
  ] = useState(false);

  // =========================================================
  // AUTH
  // =========================================================

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  const username =
    localStorage.getItem("username");

  const role =
    localStorage.getItem("role");

  const normalizedRole =
    String(role || "")
      .toUpperCase();

  // =========================================================
  // PERMISSIONS
  // =========================================================

  const canCreateSchedule = [
    "SYSTEM_ADMIN",
    "ASSET_MANAGER",
    "MAINTENANCE_TECHNICIAN",
    "OPERATIONS_SUPERVISOR"
  ].includes(normalizedRole);

  const canComplete = [
    "SYSTEM_ADMIN",
    "ASSET_MANAGER",
    "MAINTENANCE_TECHNICIAN"
  ].includes(normalizedRole);

  // =========================================================
  // FETCH
  // =========================================================

  const fetchSchedules = async () => {

    try {

      setLoading(true);
      setError("");

      let response;

      if (token) {

        response = await axios.get(
          `${API}/maintenance/schedules`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      } else {

        response = await axios.get(
          `${API}/maintenance/schedules`
        );
      }

      const data =
        response?.data;

      if (Array.isArray(data)) {

        setSchedules(data);

      } else {

        setSchedules([]);
      }

    } catch (err) {

      console.error(
        "Failed to fetch schedules:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to load maintenance schedules."
      );

      setSchedules([]);

    } finally {

      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {

    fetchSchedules();

  }, []);

  // =========================================================
  // STATUS
  // =========================================================

  const getScheduleStatus = (schedule) => {

    const backendStatus =
      String(
        schedule?.status || ""
      ).toUpperCase();

    // -------------------------------------------------------
    // ALWAYS TRUST COMPLETED
    // -------------------------------------------------------

    if (
      backendStatus ===
      "COMPLETED"
    ) {

      return "COMPLETED";
    }

    if (
      backendStatus ===
      "CANCELLED"
    ) {

      return "CANCELLED";
    }

    if (
      backendStatus ===
      "UNDER_MAINTENANCE"
    ) {

      return "UNDER_MAINTENANCE";
    }

    // -------------------------------------------------------
    // ONLY PENDING CAN BECOME OVERDUE
    // -------------------------------------------------------

    if (
      backendStatus ===
      "PENDING"
    ) {

      const plannedDate =
        schedule?.plannedDate;

      if (!plannedDate) {

        return "PENDING";
      }

      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const planned =
        new Date(
          `${plannedDate}T00:00:00`
        );

      planned.setHours(
        0,
        0,
        0,
        0
      );

      if (
        planned < today
      ) {

        return "OVERDUE";
      }

      return "PENDING";
    }

    return backendStatus ||
      "PENDING";
  };

  // =========================================================
  // STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {

    switch (status) {

      case "COMPLETED":
        return "status-completed";

      case "OVERDUE":
        return "status-overdue";

      case "CANCELLED":
        return "status-cancelled";

      case "UNDER_MAINTENANCE":
        return "status-maintenance";

      default:
        return "status-pending";
    }
  };

  // =========================================================
  // OPEN COMPLETE MODAL
  // =========================================================

  const handleComplete = (schedule) => {

    setSelectedSchedule(schedule);

    setShowCompleteModal(true);
  };

  // =========================================================
  // CLOSE COMPLETE MODAL
  // =========================================================

  const closeCompleteModal = () => {

    setShowCompleteModal(false);

    setSelectedSchedule(null);
  };

  // =========================================================
  // COMPLETED
  // =========================================================

  const handleMaintenanceCompleted =
    async () => {

      await fetchSchedules();
    };

  // =========================================================
  // CREATED
  // =========================================================

  const handleScheduleCreated =
    async () => {

      setShowScheduleModal(false);

      await fetchSchedules();
    };

  // =========================================================
  // DISPLAY
  // =========================================================

  const displaySchedules =
    useMemo(() => {

      return [...schedules];

    }, [schedules]);

  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="page-container">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="page-header">

        <div>

          <span className="page-eyebrow">
            MAINTENANCE CONTROL
          </span>

          <h1>
            Maintenance Scheduler
          </h1>

          <p>
            Monitor and manage industrial
            equipment maintenance tasks.
          </p>

        </div>

        <div className="header-actions">

          <button
            type="button"
            className="refresh-btn"
            onClick={fetchSchedules}
            disabled={loading}
          >
            {loading
              ? "Refreshing..."
              : "Refresh"}
          </button>

          {/* =================================================
              ADD SCHEDULE
          ================================================= */}

          {canCreateSchedule && (

            <button
              type="button"
              className="add-btn"
              onClick={() =>
                setShowScheduleModal(true)
              }
            >
              + Add Maintenance Schedule
            </button>

          )}

        </div>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <div
          className="form-error"
          role="alert"
        >
          {error}
        </div>

      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading ? (

        <div className="loading-state">
          Loading maintenance schedules...
        </div>

      ) : (

        <div className="table-container">

          <table className="maintenance-table">

            <thead>

              <tr>

                <th>Asset</th>

                <th>Planned Date</th>

                <th>Maintenance Type</th>

                <th>Priority</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {displaySchedules.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-table"
                  >
                    No maintenance schedules found.
                  </td>

                </tr>

              ) : (

                displaySchedules.map(
                  (schedule, index) => {

                    const status =
                      getScheduleStatus(
                        schedule
                      );

                    const asset =
                      schedule?.asset || {};

                    const assetTag =
                      asset?.assetTag ||
                      schedule?.assetTag ||
                      asset?.asset_tag ||
                      schedule?.asset_tag ||
                      "Unknown Asset";

                    return (

                      <tr
                        key={
                          schedule?.id ||
                          index
                        }
                      >

                        {/* ASSET */}

                        <td>

                          <strong>
                            {assetTag}
                          </strong>

                        </td>

                        {/* DATE */}

                        <td>
                          {schedule?.plannedDate ||
                            "-"}
                        </td>

                        {/* TYPE */}

                        <td>
                          {schedule?.maintenanceType ||
                            "-"}
                        </td>

                        {/* PRIORITY */}

                        <td>

                          <span className="priority-badge">

                            {schedule?.priority ||
                              "-"}

                          </span>

                        </td>

                        {/* STATUS */}

                        <td>

                          <span
                            className={`status-badge ${getStatusClass(
                              status
                            )}`}
                          >

                            {status}

                          </span>

                        </td>

                        {/* ACTION */}

                        <td>

                          <div className="action-buttons">

                            <button
                              type="button"
                              className="view-btn"
                              onClick={() =>
                                console.log(
                                  "Schedule:",
                                  schedule
                                )
                              }
                            >
                              View
                            </button>

                            {/* COMPLETE BUTTON */}

                            {canComplete &&
                              status !==
                                "COMPLETED" &&
                              status !==
                                "CANCELLED" && (

                                <button
                                  type="button"
                                  className="complete-btn"
                                  onClick={() =>
                                    handleComplete(
                                      schedule
                                    )
                                  }
                                >
                                  ✓ Complete
                                </button>

                              )}

                          </div>

                        </td>

                      </tr>

                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      )}

      {/* =====================================================
          COMPLETE MODAL
      ===================================================== */}

      <LogMaintenanceModal

        isOpen={
          showCompleteModal
        }

        schedule={
          selectedSchedule
        }

        onClose={
          closeCompleteModal
        }

        onCompleted={
          handleMaintenanceCompleted
        }

      />

      {/* =====================================================
          ADD SCHEDULE MODAL
      ===================================================== */}

      <ScheduleMaintenanceModal

        isOpen={
          showScheduleModal
        }

        onClose={() =>
          setShowScheduleModal(false)
        }

        onSuccess={
          handleScheduleCreated
        }

      />

    </div>
  );
};

export default MaintenanceScheduler;