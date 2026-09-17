


// // // import React, {
// // //   useState,
// // // } from "react";

// // // import {
// // //   completeMaintenance,
// // // } from "../../services/maintenanceService";

// // // const LogMaintenanceModal = ({
// // //   isOpen = true,
// // //   onClose,
// // //   schedule = null,
// // //   maintenance = null,
// // //   onSuccess,
// // // }) => {
// // //   const selected =
// // //     schedule ||
// // //     maintenance ||
// // //     {};

// // //   const [notes, setNotes] =
// // //     useState("");

// // //   const [loading, setLoading] =
// // //     useState(false);

// // //   const [error, setError] =
// // //     useState("");

// // //   const [success, setSuccess] =
// // //     useState("");

// // //   if (!isOpen) {
// // //     return null;
// // //   }

// // //   const assetId =
// // //     selected?.assetId ??
// // //     selected?.asset?.id ??
// // //     selected?.asset?.assetId ??
// // //     selected?.industrialAssetId;

// // //   const assetTag =
// // //     selected?.assetTag ??
// // //     selected?.asset?.assetTag ??
// // //     selected?.asset?.asset_tag ??
// // //     (assetId
// // //       ? `ASSET-${assetId}`
// // //       : "Unknown Asset");

// // //   const assetName =
// // //     selected?.assetName ??
// // //     selected?.asset?.name ??
// // //     selected?.name ??
// // //     "Industrial Asset";

// // //   const scheduleId =
// // //     selected?.id ??
// // //     selected?.scheduleId ??
// // //     selected?.maintenanceScheduleId;

// // //   const maintenanceType =
// // //     selected?.maintenanceType ??
// // //     selected?.type ??
// // //     "MAINTENANCE";

// // //   const plannedDate =
// // //     selected?.plannedDate ??
// // //     selected?.scheduledDate ??
// // //     selected?.date ??
// // //     "-";

// // //   const handleSubmit = async (
// // //     event
// // //   ) => {
// // //     event.preventDefault();

// // //     setError("");
// // //     setSuccess("");

// // //     if (!assetId) {
// // //       setError(
// // //         "Asset information is missing."
// // //       );
// // //       return;
// // //     }

// // //     setLoading(true);

// // //     try {
// // //       /*
// // //        * Keep the payload compatible with
// // //        * the Spring Boot maintenance log API.
// // //        *
// // //        * Extra fields are harmless for the
// // //        * frontend and help when the backend
// // //        * accepts schedule information.
// // //        */
// // //       const payload = {
// // //         assetId: Number(assetId),
// // //         scheduleId:
// // //           scheduleId != null
// // //             ? Number(scheduleId)
// // //             : undefined,
// // //         maintenanceScheduleId:
// // //           scheduleId != null
// // //             ? Number(scheduleId)
// // //             : undefined,
// // //         maintenanceType:
// // //           maintenanceType,
// // //         completionNotes:
// // //           notes.trim(),
// // //         notes:
// // //           notes.trim(),
// // //         plannedDate:
// // //           plannedDate !== "-"
// // //             ? plannedDate
// // //             : undefined,
// // //       };

// // //       /*
// // //        * Remove undefined properties.
// // //        */
// // //       Object.keys(payload).forEach(
// // //         (key) => {
// // //           if (
// // //             payload[key] ===
// // //             undefined
// // //           ) {
// // //             delete payload[key];
// // //           }
// // //         }
// // //       );

// // //       await completeMaintenance(
// // //         payload
// // //       );

// // //       setSuccess(
// // //         "Maintenance task completed successfully."
// // //       );

// // //       setNotes("");

// // //       /*
// // //        * Refresh parent data.
// // //        */
// // //       if (
// // //         typeof onSuccess ===
// // //         "function"
// // //       ) {
// // //         setTimeout(() => {
// // //           onSuccess();
// // //         }, 500);
// // //       }

// // //     } catch (err) {
// // //       console.error(
// // //         "Maintenance completion failed:",
// // //         err
// // //       );

// // //       const status =
// // //         err?.response?.status;

// // //       const backendMessage =
// // //         err?.response?.data
// // //           ?.message ||
// // //         err?.response?.data
// // //           ?.error;

// // //       if (status === 401) {
// // //         setError(
// // //           "Your session has expired. Please login again."
// // //         );
// // //       } else if (
// // //         status === 403
// // //       ) {
// // //         setError(
// // //           "Access denied. A TECHNICIAN or ADMIN role is required to complete maintenance."
// // //         );
// // //       } else if (
// // //         status === 400
// // //       ) {
// // //         setError(
// // //           backendMessage ||
// // //             "Invalid maintenance information."
// // //         );
// // //       } else {
// // //         setError(
// // //           backendMessage ||
// // //             err?.message ||
// // //             "Unable to complete maintenance task."
// // //         );
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleClose = () => {
// // //     if (loading) {
// // //       return;
// // //     }

// // //     setError("");
// // //     setSuccess("");
// // //     setNotes("");

// // //     if (
// // //       typeof onClose ===
// // //       "function"
// // //     ) {
// // //       onClose();
// // //     }
// // //   };

// // //   return (
// // //     <div
// // //       className="modal-overlay maintenance-modal-overlay"
// // //       role="presentation"
// // //       onMouseDown={(event) => {
// // //         if (
// // //           event.target ===
// // //           event.currentTarget
// // //         ) {
// // //           handleClose();
// // //         }
// // //       }}
// // //     >

// // //       <div
// // //         className="modal-card maintenance-log-modal"
// // //         role="dialog"
// // //         aria-modal="true"
// // //         aria-labelledby="maintenance-log-title"
// // //       >

// // //         {/* HEADER */}
// // //         <div className="modal-header">

// // //           <div>
// // //             <span className="eyebrow">
// // //               MAINTENANCE LOG
// // //             </span>

// // //             <h2 id="maintenance-log-title">
// // //               Complete Maintenance Task
// // //             </h2>
// // //           </div>

// // //           <button
// // //             type="button"
// // //             className="modal-close"
// // //             onClick={
// // //               handleClose
// // //             }
// // //             disabled={loading}
// // //             aria-label="Close"
// // //           >
// // //             ×
// // //           </button>

// // //         </div>

// // //         {/* ASSET INFORMATION */}
// // //         <div className="maintenance-detail-card">

// // //           <div className="maintenance-detail-icon">
// // //             ⚙
// // //           </div>

// // //           <div className="maintenance-detail-content">

// // //             <span>
// // //               Asset
// // //             </span>

// // //             <strong>
// // //               {assetTag}
// // //             </strong>

// // //             <small>
// // //               {assetName}
// // //             </small>

// // //           </div>

// // //         </div>

// // //         <div className="maintenance-meta-grid">

// // //           <div className="maintenance-meta-item">
// // //             <span>
// // //               Maintenance Type
// // //             </span>

// // //             <strong>
// // //               {maintenanceType}
// // //             </strong>
// // //           </div>

// // //           <div className="maintenance-meta-item">
// // //             <span>
// // //               Planned Date
// // //             </span>

// // //             <strong>
// // //               {plannedDate}
// // //             </strong>
// // //           </div>

// // //         </div>

// // //         {/* FORM */}
// // //         <form
// // //           onSubmit={
// // //             handleSubmit
// // //           }
// // //         >

// // //           <div className="form-group">

// // //             <label htmlFor="completion-notes">
// // //               Completion Notes
// // //             </label>

// // //             <textarea
// // //               id="completion-notes"
// // //               name="completionNotes"
// // //               placeholder="Enter maintenance completion notes..."
// // //               value={notes}
// // //               onChange={(event) =>
// // //                 setNotes(
// // //                   event.target.value
// // //                 )
// // //               }
// // //               rows={5}
// // //               disabled={loading}
// // //             />

// // //           </div>

// // //           {/* ERROR */}
// // //           {error && (
// // //             <div
// // //               className="error-message modal-error"
// // //               role="alert"
// // //             >
// // //               {error}
// // //             </div>
// // //           )}

// // //           {/* SUCCESS */}
// // //           {success && (
// // //             <div
// // //               className="success-message"
// // //               role="status"
// // //             >
// // //               {success}
// // //             </div>
// // //           )}

// // //           {/* BUTTONS */}
// // //           <div className="modal-actions">

// // //             <button
// // //               type="button"
// // //               className="secondary-btn"
// // //               onClick={
// // //                 handleClose
// // //               }
// // //               disabled={loading}
// // //             >
// // //               Cancel
// // //             </button>

// // //             <button
// // //               type="submit"
// // //               className="primary-btn complete-task-btn"
// // //               disabled={loading}
// // //             >
// // //               {loading
// // //                 ? "Completing..."
// // //                 : "Complete Task"}
// // //             </button>

// // //           </div>

// // //         </form>

// // //       </div>

// // //     </div>
// // //   );
// // // };

// // // export default LogMaintenanceModal;
// // import React, {
// //   useState,
// // } from "react";

// // import {
// //   useDispatch,
// //   useSelector,
// // } from "react-redux";

// // import {
// //   logMaintenance,
// // } from "../../store/slices/maintenanceSlice";

// // import {
// //   normalizeRole,
// //   canCompleteMaintenance,
// // } from "../../utils/roleAccess";

// // const LogMaintenanceModal = ({
// //   isOpen = true,
// //   onClose,
// //   schedule,
// //   asset,
// // }) => {

// //   const dispatch = useDispatch();

// //   const auth =
// //     useSelector(
// //       (state) =>
// //         state.auth || {}
// //     );

// //   const role =
// //     normalizeRole(
// //       auth.role ||
// //       auth.user?.role ||
// //       ""
// //     );

// //   const [notes, setNotes] =
// //     useState("");

// //   const [error, setError] =
// //     useState("");

// //   const [loading, setLoading] =
// //     useState(false);

// //   if (!isOpen) {
// //     return null;
// //   }

// //   const selectedAsset =
// //     asset ||
// //     schedule?.asset ||
// //     {};

// //   const assetId =
// //     selectedAsset?.id ||
// //     selectedAsset?.assetId ||
// //     schedule?.assetId;

// //   const handleSubmit =
// //     async (event) => {

// //       event.preventDefault();

// //       setError("");

// //       if (!canCompleteMaintenance(role)) {

// //         setError(
// //           "You do not have permission to complete maintenance."
// //         );

// //         return;
// //       }

// //       if (!assetId) {

// //         setError(
// //           "Asset information is missing."
// //         );

// //         return;
// //       }

// //       setLoading(true);

// //       try {

// //         await dispatch(
// //           logMaintenance({
// //             assetId: Number(assetId),
// //             scheduleId:
// //               schedule?.id ||
// //               schedule?.scheduleId ||
// //               null,
// //             completionNotes:
// //               notes,
// //             notes: notes,
// //           })
// //         ).unwrap();

// //         setNotes("");

// //         if (onClose) {
// //           onClose();
// //         }

// //       } catch (err) {

// //         setError(
// //           typeof err === "string"
// //             ? err
// //             : err?.message ||
// //               "Failed to complete maintenance task."
// //         );

// //       } finally {

// //         setLoading(false);

// //       }
// //     };

// //   return (

// //     <div className="modal-overlay">

// //       <div className="modal-card">

// //         <button
// //           type="button"
// //           className="modal-close"
// //           onClick={onClose}
// //         >
// //           ×
// //         </button>

// //         <p className="eyebrow">
// //           MAINTENANCE LOG
// //         </p>

// //         <h2>
// //           Complete Maintenance Task
// //         </h2>

// //         <div className="modal-asset">

// //           <span>
// //             Asset
// //           </span>

// //           <strong>
// //             {selectedAsset?.assetTag ||
// //               selectedAsset?.name ||
// //               schedule?.assetTag ||
// //               schedule?.assetId ||
// //               "-"}
// //           </strong>

// //         </div>

// //         <form
// //           onSubmit={handleSubmit}
// //         >

// //           <label>
// //             Completion Notes
// //           </label>

// //           <textarea
// //             value={notes}
// //             onChange={(e) =>
// //               setNotes(e.target.value)
// //             }
// //             placeholder="Enter completion notes..."
// //             rows="5"
// //           />

// //           {error && (

// //             <div className="error-message">
// //               {error}
// //             </div>

// //           )}

// //           <div className="modal-actions">

// //             <button
// //               type="button"
// //               className="secondary-btn"
// //               onClick={onClose}
// //             >
// //               Cancel
// //             </button>

// //             {canCompleteMaintenance(
// //               role
// //             ) && (

// //               <button
// //                 type="submit"
// //                 className="primary-btn"
// //                 disabled={loading}
// //               >
// //                 {loading
// //                   ? "Completing..."
// //                   : "Complete Task"}
// //               </button>

// //             )}

// //           </div>

// //         </form>

// //       </div>

// //     </div>
// //   );
// // };

// // export default LogMaintenanceModal;
// import React, { useState } from "react";
// import axios from "axios";

// const API = "http://localhost:8080/api";

// const LogMaintenanceModal = ({
//   isOpen = false,
//   onClose = () => {},
//   onCompleted = () => {},
//   schedule = null,
//   maintenance = null,
// }) => {
//   const [completionNotes, setCompletionNotes] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const currentSchedule = schedule || maintenance;

//   if (!isOpen) {
//     return null;
//   }

//   const scheduleId =
//     currentSchedule?.id ??
//     currentSchedule?.scheduleId ??
//     currentSchedule?.maintenanceScheduleId;

//   const assetTag =
//     currentSchedule?.asset?.assetTag ??
//     currentSchedule?.assetTag ??
//     currentSchedule?.asset?.asset_tag ??
//     "Industrial Asset";

//   const getToken = () => {
//     return (
//       localStorage.getItem("token") ||
//       localStorage.getItem("authToken")
//     );
//   };

//   const handleComplete = async (event) => {
//     event.preventDefault();

//     if (!scheduleId) {
//       setError("Maintenance schedule ID is missing.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const token = getToken();

//       const config = token
//         ? {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         : undefined;

//       /*
//        * Backend endpoint:
//        * PUT /api/maintenance/{id}/complete
//        */
//       const response = await axios.put(
//         `${API}/maintenance/${scheduleId}/complete`,
//         {
//           scheduleId: scheduleId,
//           assetId:
//             currentSchedule?.asset?.id ??
//             currentSchedule?.assetId ??
//             null,
//           completionNotes: completionNotes.trim(),
//           notes: completionNotes.trim(),
//         },
//         config
//       );

//       setSuccess(
//         response?.data?.message ||
//           "Maintenance task completed successfully."
//       );

//       /*
//        * Tell Maintenance page to refresh its data.
//        */
//       if (typeof onCompleted === "function") {
//         onCompleted(response?.data);
//       }

//       /*
//        * Close after the success message has been displayed.
//        */
//       setTimeout(() => {
//         setCompletionNotes("");
//         setSuccess("");

//         if (typeof onClose === "function") {
//           onClose();
//         }
//       }, 700);
//     } catch (err) {
//       console.error(
//         "Maintenance completion failed:",
//         err
//       );

//       const message =
//         err?.response?.data?.message ||
//         (typeof err?.response?.data === "string"
//           ? err.response.data
//           : null) ||
//         err?.message ||
//         "Unable to complete maintenance task.";

//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (loading) {
//       return;
//     }

//     setCompletionNotes("");
//     setError("");
//     setSuccess("");

//     if (typeof onClose === "function") {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="modal-overlay maintenance-modal-overlay"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="maintenance-modal-title"
//     >
//       <div className="maintenance-modal">

//         <div className="modal-header">
//           <div>
//             <span className="modal-eyebrow">
//               MAINTENANCE LOG
//             </span>

//             <h2 id="maintenance-modal-title">
//               Complete Maintenance Task
//             </h2>

//             <p>
//               Record the completion details for
//               this maintenance task.
//             </p>
//           </div>

//           <button
//             type="button"
//             className="modal-close"
//             onClick={handleCancel}
//             disabled={loading}
//             aria-label="Close"
//           >
//             ×
//           </button>
//         </div>

//         <form
//           className="maintenance-complete-form"
//           onSubmit={handleComplete}
//         >
//           <div className="maintenance-info">
//             <span className="info-label">
//               Asset
//             </span>

//             <strong>
//               {assetTag}
//             </strong>
//           </div>

//           <div className="form-group">
//             <label htmlFor="completionNotes">
//               Completion Notes
//             </label>

//             <textarea
//               id="completionNotes"
//               name="completionNotes"
//               placeholder="Enter completion notes..."
//               value={completionNotes}
//               onChange={(event) => {
//                 setCompletionNotes(
//                   event.target.value
//                 );
//                 setError("");
//                 setSuccess("");
//               }}
//               rows="5"
//               disabled={loading}
//             />
//           </div>

//           {error && (
//             <div
//               className="form-error"
//               role="alert"
//             >
//               {error}
//             </div>
//           )}

//           {success && (
//             <div
//               className="form-success"
//               role="status"
//             >
//               {success}
//             </div>
//           )}

//           <div className="modal-actions">

//             <button
//               type="button"
//               className="secondary-btn"
//               onClick={handleCancel}
//               disabled={loading}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="primary-btn"
//               disabled={loading}
//             >
//               {loading
//                 ? "Completing..."
//                 : "Complete Task"}
//             </button>

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LogMaintenanceModal;
import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8080/api";

const LogMaintenanceModal = ({
  isOpen = false,
  onClose = () => {},
  onCompleted = () => {},
  schedule = null,
  maintenance = null,
}) => {
  const currentSchedule = schedule || maintenance;

  const [completionNotes, setCompletionNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * Reset modal whenever it is opened
   */
  useEffect(() => {
    if (isOpen) {
      setCompletionNotes("");
      setError("");
      setSuccess("");
      setLoading(false);
    }
  }, [isOpen, currentSchedule]);

  /*
   * Do not render when modal is closed
   */
  if (!isOpen) {
    return null;
  }

  /*
   * Get maintenance schedule ID
   */
  const scheduleId =
    currentSchedule?.id ??
    currentSchedule?.scheduleId ??
    currentSchedule?.maintenanceScheduleId ??
    currentSchedule?.maintenance_schedule_id;

  /*
   * Get asset ID
   */
  const assetId =
    currentSchedule?.asset?.id ??
    currentSchedule?.assetId ??
    currentSchedule?.asset_id ??
    null;

  /*
   * Get asset tag for display
   */
  const assetTag =
    currentSchedule?.asset?.assetTag ??
    currentSchedule?.asset?.asset_tag ??
    currentSchedule?.assetTag ??
    currentSchedule?.asset_tag ??
    "Industrial Asset";

  /*
   * Get JWT token
   */
  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken")
    );
  };

  /*
   * Complete maintenance task
   */
  const handleComplete = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    /*
     * Validate schedule ID
     */
    if (!scheduleId) {
      setError("Maintenance schedule ID is missing.");
      return;
    }

    setLoading(true);

    try {
      const token = getToken();

      /*
       * Request body expected by backend
       */
      const payload = {
        assetId:
          assetId !== null && assetId !== undefined
            ? Number(assetId)
            : null,

        scheduleId: Number(scheduleId),

        completionNotes:
          completionNotes.trim(),

        notes:
          completionNotes.trim(),
      };

      let response;

      /*
       * Backend completion endpoint
       *
       * POST /api/maintenance/log
       */
      if (token) {
        response = await axios.post(
          `${API}/maintenance/log`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `${API}/maintenance/log`,
          payload
        );
      }

      console.log(
        "Maintenance completed:",
        response?.data
      );

      /*
       * Show success message
       */
      setSuccess(
        response?.data?.message ||
          "Maintenance task completed successfully."
      );

      /*
       * Refresh maintenance data in parent
       */
      if (typeof onCompleted === "function") {
        await onCompleted(response?.data);
      }

      /*
       * Close modal after success
       */
      setTimeout(() => {
        setCompletionNotes("");
        setSuccess("");
        setError("");

        if (typeof onClose === "function") {
          onClose();
        }
      }, 700);

    } catch (err) {
      console.error(
        "Maintenance completion failed:",
        err
      );

      const serverMessage =
        err?.response?.data?.message;

      const responseMessage =
        typeof err?.response?.data === "string"
          ? err.response.data
          : null;

      const message =
        serverMessage ||
        responseMessage ||
        err?.message ||
        "Unable to complete maintenance task.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  /*
   * Cancel / close modal
   */
  const handleCancel = () => {
    if (loading) {
      return;
    }

    setCompletionNotes("");
    setError("");
    setSuccess("");

    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay maintenance-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-modal-title"
    >
      <div className="maintenance-modal">

        {/* ================= HEADER ================= */}

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

        {/* ================= FORM ================= */}

        <form
          className="maintenance-complete-form"
          onSubmit={handleComplete}
        >

          {/* Asset information */}

          <div className="maintenance-info">
            <span className="info-label">
              Asset
            </span>

            <strong>
              {assetTag}
            </strong>
          </div>

          {/* Schedule information */}

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

          {/* Completion notes */}

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

          {/* Error */}

          {error && (
            <div
              className="form-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Success */}

          {success && (
            <div
              className="form-success"
              role="status"
            >
              {success}
            </div>
          )}

          {/* ================= ACTIONS ================= */}

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