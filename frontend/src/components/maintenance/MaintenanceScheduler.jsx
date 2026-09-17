



// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchSchedules,
// //   createSchedule,
// // } from "../../store/slices/maintenanceSlice";
// // import ScheduleMaintenanceModal from "./ScheduleMaintenanceModal";
// // import LogMaintenanceModal from "./LogMaintenanceModal";

// // const MaintenanceScheduler = () => {
// //   const dispatch = useDispatch();

// //   const maintenance = useSelector(
// //     (state) => state.maintenance || {}
// //   );

// //   const auth = useSelector(
// //     (state) => state.auth || {}
// //   );

// //   const schedules = Array.isArray(
// //     maintenance.schedules
// //   )
// //     ? maintenance.schedules
// //     : [];

// //   const loading =
// //     maintenance.loading === true;

// //   const error =
// //     maintenance.error;

// //   const [showScheduleModal, setShowScheduleModal] =
// //     useState(false);

// //   const [showLogModal, setShowLogModal] =
// //     useState(false);

// //   const [selectedSchedule, setSelectedSchedule] =
// //     useState(null);

// //   const [search, setSearch] =
// //     useState("");

// //   const role = String(
// //     auth.role ||
// //       auth.user?.role ||
// //       localStorage.getItem("role") ||
// //       ""
// //   ).toUpperCase();

// //   const isAdmin = [
// //     "ADMIN",
// //     "ADMINISTRATOR",
// //     "SUPER_ADMIN",
// //   ].includes(role);

// //   const isAssetManager =
// //     role === "ASSET_MANAGER";

// //   const isTechnician =
// //     role === "TECHNICIAN";

// //   const canSchedule =
// //     isAdmin ||
// //     isAssetManager;

// //   const canComplete =
// //     isAdmin ||
// //     isTechnician;

// //   useEffect(() => {
// //     /*
// //      * Load maintenance schedules only once.
// //      * This prevents repeated API calls when Redux state changes.
// //      */
// //     if (
// //       schedules.length === 0 &&
// //       !loading
// //     ) {
// //       dispatch(fetchSchedules());
// //     }
// //   }, [
// //     dispatch,
// //     schedules.length,
// //     loading,
// //   ]);

// //   const refreshSchedules = () => {
// //     dispatch(fetchSchedules());
// //   };

// //   const handleOpenSchedule = () => {
// //     setShowScheduleModal(true);
// //   };

// //   const handleCloseSchedule = () => {
// //     setShowScheduleModal(false);
// //   };

// //   const handleOpenLog = (schedule) => {
// //     setSelectedSchedule(schedule);
// //     setShowLogModal(true);
// //   };

// //   const handleCloseLog = () => {
// //     setShowLogModal(false);
// //     setSelectedSchedule(null);
// //   };

// //   const handleScheduleSuccess = () => {
// //     setShowScheduleModal(false);
// //     refreshSchedules();
// //   };

// //   const handleMaintenanceSuccess = () => {
// //     setShowLogModal(false);
// //     setSelectedSchedule(null);
// //     refreshSchedules();
// //   };

// //   const getAssetId = (schedule) => {
// //     return (
// //       schedule?.assetId ??
// //       schedule?.asset?.id ??
// //       schedule?.asset?.assetId ??
// //       schedule?.industrialAssetId ??
// //       "-"
// //     );
// //   };

// //   const getAssetTag = (schedule) => {
// //     return (
// //       schedule?.assetTag ??
// //       schedule?.asset?.assetTag ??
// //       schedule?.asset?.asset_tag ??
// //       `ASSET-${getAssetId(schedule)}`
// //     );
// //   };

// //   const getAssetName = (schedule) => {
// //     return (
// //       schedule?.assetName ??
// //       schedule?.asset?.name ??
// //       schedule?.name ??
// //       "Industrial Asset"
// //     );
// //   };

// //   const getMaintenanceType = (schedule) => {
// //     return (
// //       schedule?.maintenanceType ??
// //       schedule?.type ??
// //       "-"
// //     );
// //   };

// //   const getPriority = (schedule) => {
// //     return (
// //       schedule?.priority ??
// //       "MEDIUM"
// //     );
// //   };

// //   const getDate = (schedule) => {
// //     return (
// //       schedule?.plannedDate ??
// //       schedule?.scheduledDate ??
// //       schedule?.date ??
// //       "-"
// //     );
// //   };

// //   const getStatus = (schedule) => {
// //     return (
// //       schedule?.status ??
// //       schedule?.scheduleStatus ??
// //       "SCHEDULED"
// //     );
// //   };

// //   const filteredSchedules =
// //     schedules.filter((schedule) => {
// //       const query =
// //         search.trim().toLowerCase();

// //       if (!query) {
// //         return true;
// //       }

// //       const text = [
// //         getAssetId(schedule),
// //         getAssetTag(schedule),
// //         getAssetName(schedule),
// //         getMaintenanceType(schedule),
// //         getPriority(schedule),
// //         getStatus(schedule),
// //       ]
// //         .join(" ")
// //         .toLowerCase();

// //       return text.includes(query);
// //     });

// //   const getPriorityClass = (priority) => {
// //     const value = String(
// //       priority || ""
// //     ).toLowerCase();

// //     if (value === "high") {
// //       return "priority-high";
// //     }

// //     if (value === "critical") {
// //       return "priority-critical";
// //     }

// //     if (value === "low") {
// //       return "priority-low";
// //     }

// //     return "priority-medium";
// //   };

// //   const getStatusClass = (status) => {
// //     const value = String(
// //       status || ""
// //     ).toLowerCase();

// //     if (
// //       value.includes("complete") ||
// //       value.includes("completed")
// //     ) {
// //       return "status-completed";
// //     }

// //     if (
// //       value.includes("cancel")
// //     ) {
// //       return "status-cancelled";
// //     }

// //     if (
// //       value.includes("progress")
// //     ) {
// //       return "status-progress";
// //     }

// //     return "status-scheduled";
// //   };

// //   return (
// //     <div className="page-container maintenance-page">

// //       {/* PAGE HEADER */}
// //       <div className="page-header maintenance-header">

// //         <div>
// //           <p className="eyebrow">
// //             MAINTENANCE MANAGEMENT
// //           </p>

// //           <h1>
// //             Maintenance Scheduler
// //           </h1>

// //           <p className="page-subtitle">
// //             Schedule, monitor and complete
// //             industrial asset maintenance tasks.
// //           </p>
// //         </div>

// //         <div className="maintenance-header-actions">

// //           <button
// //             type="button"
// //             className="secondary-btn refresh-btn"
// //             onClick={refreshSchedules}
// //             disabled={loading}
// //           >
// //             {loading
// //               ? "Refreshing..."
// //               : "Refresh"}
// //           </button>

// //           {canSchedule && (
// //             <button
// //               type="button"
// //               className="add-btn"
// //               onClick={handleOpenSchedule}
// //             >
// //               + Schedule Maintenance
// //             </button>
// //           )}

// //         </div>
// //       </div>

// //       {/* SUMMARY CARDS */}
// //       <div className="maintenance-summary-grid">

// //         <div className="maintenance-summary-card">
// //           <div className="summary-icon">
// //             ⚙
// //           </div>

// //           <div>
// //             <span>Total Schedules</span>
// //             <strong>
// //               {schedules.length}
// //             </strong>
// //           </div>
// //         </div>

// //         <div className="maintenance-summary-card">
// //           <div className="summary-icon">
// //             📅
// //           </div>

// //           <div>
// //             <span>Scheduled</span>
// //             <strong>
// //               {
// //                 schedules.filter(
// //                   (item) =>
// //                     String(
// //                       getStatus(item)
// //                     ).toUpperCase() ===
// //                     "SCHEDULED"
// //                 ).length
// //               }
// //             </strong>
// //           </div>
// //         </div>

// //         <div className="maintenance-summary-card">
// //           <div className="summary-icon">
// //             ✓
// //           </div>

// //           <div>
// //             <span>Completed</span>
// //             <strong>
// //               {
// //                 schedules.filter(
// //                   (item) =>
// //                     String(
// //                       getStatus(item)
// //                     )
// //                       .toLowerCase()
// //                       .includes(
// //                         "complete"
// //                       )
// //                 ).length
// //               }
// //             </strong>
// //           </div>
// //         </div>

// //         <div className="maintenance-summary-card">
// //           <div className="summary-icon danger">
// //             !
// //           </div>

// //           <div>
// //             <span>High Priority</span>
// //             <strong>
// //               {
// //                 schedules.filter(
// //                   (item) => {
// //                     const priority =
// //                       String(
// //                         getPriority(item)
// //                       ).toUpperCase();

// //                     return (
// //                       priority ===
// //                         "HIGH" ||
// //                       priority ===
// //                         "CRITICAL"
// //                     );
// //                   }
// //                 ).length
// //               }
// //             </strong>
// //           </div>
// //         </div>

// //       </div>

// //       {/* SEARCH */}
// //       <div className="maintenance-toolbar">

// //         <input
// //           type="text"
// //           className="search-input"
// //           placeholder="Search maintenance schedules..."
// //           value={search}
// //           onChange={(event) =>
// //             setSearch(event.target.value)
// //           }
// //         />

// //         <span className="schedule-count">
// //           Showing{" "}
// //           {filteredSchedules.length}{" "}
// //           schedule
// //           {filteredSchedules.length !==
// //           1
// //             ? "s"
// //             : ""}
// //         </span>

// //       </div>

// //       {/* ERROR */}
// //       {error && (
// //         <div className="error-message maintenance-error">
// //           {typeof error === "string"
// //             ? error
// //             : error?.message ||
// //               "Unable to load maintenance schedules."}
// //         </div>
// //       )}

// //       {/* LOADING */}
// //       {loading && (
// //         <div
// //           className="loading-spinner"
// //           role="status"
// //         >
// //           Loading maintenance schedules...
// //         </div>
// //       )}

// //       {/* TABLE */}
// //       {!loading && (
// //         <div className="maintenance-table-card">

// //           {filteredSchedules.length >
// //           0 ? (
// //             <div className="table-wrapper">

// //               <table className="maintenance-table">

// //                 <thead>
// //                   <tr>
// //                     <th>Asset</th>
// //                     <th>Asset Name</th>
// //                     <th>Planned Date</th>
// //                     <th>Maintenance Type</th>
// //                     <th>Priority</th>
// //                     <th>Status</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>

// //                 <tbody>

// //                   {filteredSchedules.map(
// //                     (schedule, index) => {

// //                       const key =
// //                         schedule?.id ??
// //                         schedule?.scheduleId ??
// //                         `${getAssetId(
// //                           schedule
// //                         )}-${index}`;

// //                       const status =
// //                         getStatus(
// //                           schedule
// //                         );

// //                       return (
// //                         <tr
// //                           key={key}
// //                         >

// //                           <td>
// //                             <strong>
// //                               {getAssetTag(
// //                                 schedule
// //                               )}
// //                             </strong>
// //                           </td>

// //                           <td>
// //                             {getAssetName(
// //                               schedule
// //                             )}
// //                           </td>

// //                           <td>
// //                             <span className="date-cell">
// //                               {getDate(
// //                                 schedule
// //                               )}
// //                             </span>
// //                           </td>

// //                           <td>
// //                             <span className="maintenance-type">
// //                               {getMaintenanceType(
// //                                 schedule
// //                               )}
// //                             </span>
// //                           </td>

// //                           <td>
// //                             <span
// //                               className={`priority-badge ${getPriorityClass(
// //                                 getPriority(
// //                                   schedule
// //                                 )
// //                               )}`}
// //                             >
// //                               {getPriority(
// //                                 schedule
// //                               )}
// //                             </span>
// //                           </td>

// //                           <td>
// //                             <span
// //                               className={`status-badge ${getStatusClass(
// //                                 status
// //                               )}`}
// //                             >
// //                               {status}
// //                             </span>
// //                           </td>

// //                           <td>

// //                             <div className="maintenance-actions">

// //                               <button
// //                                 type="button"
// //                                 className="view-btn"
// //                                 onClick={() =>
// //                                   handleOpenLog(
// //                                     schedule
// //                                   )
// //                                 }
// //                               >
// //                                 View
// //                               </button>

// //                               {canComplete &&
// //                                 !String(
// //                                   status
// //                                 )
// //                                   .toLowerCase()
// //                                   .includes(
// //                                     "complete"
// //                                   ) && (
// //                                   <button
// //                                     type="button"
// //                                     className="complete-btn"
// //                                     onClick={() =>
// //                                       handleOpenLog(
// //                                         schedule
// //                                       )
// //                                     }
// //                                   >
// //                                     Complete
// //                                   </button>
// //                                 )}

// //                             </div>

// //                           </td>

// //                         </tr>
// //                       );
// //                     }
// //                   )}

// //                 </tbody>

// //               </table>

// //             </div>
// //           ) : (
// //             <div className="maintenance-empty">

// //               <div className="empty-icon">
// //                 ⚙
// //               </div>

// //               <h3>
// //                 No Maintenance Schedules
// //               </h3>

// //               <p>
// //                 No maintenance schedules
// //                 match your search.
// //               </p>

// //               {canSchedule && (
// //                 <button
// //                   type="button"
// //                   className="add-btn"
// //                   onClick={
// //                     handleOpenSchedule
// //                   }
// //                 >
// //                   Schedule Maintenance
// //                 </button>
// //               )}

// //             </div>
// //           )}

// //         </div>
// //       )}

// //       {/* SCHEDULE MODAL */}
// //       {showScheduleModal && (
// //         <ScheduleMaintenanceModal
// //           isOpen={
// //             showScheduleModal
// //           }
// //           onClose={
// //             handleCloseSchedule
// //           }
// //           onSuccess={
// //             handleScheduleSuccess
// //           }
// //         />
// //       )}

// //       {/* LOG / COMPLETE MODAL */}
// //       {showLogModal &&
// //         selectedSchedule && (
// //           <LogMaintenanceModal
// //             isOpen={showLogModal}
// //             onClose={
// //               handleCloseLog
// //             }
// //             schedule={
// //               selectedSchedule
// //             }
// //             onSuccess={
// //               handleMaintenanceSuccess
// //             }
// //           />
// //         )}

// //     </div>
// //   );
// // };

// // export default MaintenanceScheduler;
// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   fetchSchedules,
//   createSchedule,
// } from "../../store/slices/maintenanceSlice";

// import ScheduleMaintenanceModal
//   from "./ScheduleMaintenanceModal";

// import {
//   normalizeRole,
//   canScheduleMaintenance,
//   canCompleteMaintenance,
// } from "../../utils/roleAccess";

// import LogMaintenanceModal
//   from "./LogMaintenanceModal";

// const MaintenanceScheduler = () => {

//   const dispatch = useDispatch();

//   const maintenance =
//     useSelector(
//       (state) =>
//         state.maintenance || {}
//     );

//   const auth =
//     useSelector(
//       (state) =>
//         state.auth || {}
//     );

//   const role =
//     normalizeRole(
//       auth.role ||
//       auth.user?.role ||
//       ""
//     );

//   const schedules =
//     Array.isArray(
//       maintenance.schedules
//     )
//       ? maintenance.schedules
//       : [];

//   const loading =
//     maintenance.loading === true;

//   const error =
//     maintenance.error;

//   const [showScheduleModal, setShowScheduleModal] =
//     useState(false);

//   const [showLogModal, setShowLogModal] =
//     useState(false);

//   const [selectedSchedule, setSelectedSchedule] =
//     useState(null);

//   useEffect(() => {

//     if (
//       schedules.length === 0 &&
//       !loading
//     ) {
//       dispatch(fetchSchedules());
//     }

//   }, [
//     dispatch,
//     schedules.length,
//     loading,
//   ]);

//   const openLogModal = (schedule) => {

//     setSelectedSchedule(schedule);

//     setShowLogModal(true);
//   };

//   return (

//     <div className="page-container maintenance-page">

//       <div className="page-header">

//         <div>

//           <p className="eyebrow">
//             MAINTENANCE MANAGEMENT
//           </p>

//           <h1>
//             Maintenance Scheduler
//           </h1>

//           <p className="page-subtitle">
//             Schedule and track industrial
//             equipment maintenance.
//           </p>

//         </div>

//         {canScheduleMaintenance(role) && (

//           <button
//             type="button"
//             className="add-btn"
//             onClick={() =>
//               setShowScheduleModal(true)
//             }
//           >
//             Schedule Maintenance
//           </button>

//         )}

//       </div>

//       {error && (

//         <div className="error-message">
//           {typeof error === "string"
//             ? error
//             : "Failed to load maintenance schedules"}
//         </div>

//       )}

//       {loading && (

//         <div
//           className="loading-spinner"
//           role="status"
//         >
//           Loading...
//         </div>

//       )}

//       {!loading && (

//         <div className="table-wrapper">

//           <table className="asset-table">

//             <thead>

//               <tr>

//                 <th>
//                   Asset
//                 </th>

//                 <th>
//                   Planned Date
//                 </th>

//                 <th>
//                   Maintenance Type
//                 </th>

//                 <th>
//                   Priority
//                 </th>

//                 <th>
//                   Status
//                 </th>

//                 <th>
//                   Action
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {schedules.length > 0 ? (

//                 schedules.map(
//                   (schedule, index) => {

//                     const id =
//                       schedule?.id ??
//                       schedule?.scheduleId ??
//                       index;

//                     return (

//                       <tr key={id}>

//                         <td>
//                           {schedule?.asset?.assetTag ||
//                             schedule?.assetTag ||
//                             schedule?.assetId ||
//                             "-"}
//                         </td>

//                         <td>
//                           {schedule?.plannedDate ||
//                             "-"}
//                         </td>

//                         <td>
//                           {schedule?.maintenanceType ||
//                             "-"}
//                         </td>

//                         <td>
//                           {schedule?.priority ||
//                             "-"}
//                         </td>

//                         <td>
//                           {schedule?.status ||
//                             "SCHEDULED"}
//                         </td>

//                         <td>

//                           {canCompleteMaintenance(
//                             role
//                           ) && (

//                             <button
//                               type="button"
//                               className="primary-btn small-btn"
//                               onClick={() =>
//                                 openLogModal(
//                                   schedule
//                                 )
//                               }
//                             >
//                               Complete Task
//                             </button>

//                           )}

//                         </td>

//                       </tr>

//                     );
//                   }
//                 )

//               ) : (

//                 <tr>

//                   <td
//                     colSpan="6"
//                     className="empty-cell"
//                   >
//                     No maintenance schedules found.
//                   </td>

//                 </tr>

//               )}

//             </tbody>

//           </table>

//         </div>

//       )}

//       {showScheduleModal && (

//         <ScheduleMaintenanceModal
//           isOpen={
//             showScheduleModal
//           }
//           onClose={() =>
//             setShowScheduleModal(false)
//           }
//         />

//       )}

//       {showLogModal && (

//         <LogMaintenanceModal
//           isOpen={
//             showLogModal
//           }
//           onClose={() =>
//             setShowLogModal(false)
//           }
//           schedule={
//             selectedSchedule
//           }
//         />

//       )}

//     </div>

//   );
// };

// export default MaintenanceScheduler;
import React, {
  useCallback,
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useSelector
} from "react-redux";

import ScheduleMaintenanceModal
  from "./ScheduleMaintenanceModal";

import LogMaintenanceModal
  from "./LogMaintenanceModal";


const API =
  "http://localhost:8080/api";


const MaintenanceScheduler = () => {

  const auth =
    useSelector(
      (state) => state.auth || {}
    );

  const [schedules, setSchedules] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showSchedule, setShowSchedule] =
    useState(false);

  const [selectedSchedule, setSelectedSchedule] =
    useState(null);


  const role =
    String(
      auth.role ||
      auth.user?.role ||
      localStorage.getItem("role") ||
      ""
    ).toUpperCase();


  const canSchedule =
    [
      "SYSTEM_ADMIN",
      "ADMIN",
      "ASSET_MANAGER",
      "MANAGER"
    ].includes(role);


  const canComplete =
    [
      "SYSTEM_ADMIN",
      "ADMIN",
      "MAINTENANCE_TECHNICIAN",
      "TECH"
    ].includes(role);


  const getConfig = () => {

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem(
        "authToken"
      );

    return token
      ? {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      : {};

  };


  const loadSchedules =
    useCallback(async () => {

      try {

        const response =
          await axios.get(
            `${API}/maintenance/schedules`,
            getConfig()
          );

        const data =
          Array.isArray(
            response.data
          )
            ? response.data
            : [];

        setSchedules(data);

      } catch (error) {

        console.error(
          "Maintenance loading failed:",
          error
        );

      } finally {

        setLoading(false);

      }

    }, []);


  useEffect(() => {

    loadSchedules();

    const timer =
      setInterval(
        loadSchedules,
        10000
      );

    return () =>
      clearInterval(timer);

  }, [loadSchedules]);


  const getStatus =
    (schedule) => {

      const backendStatus =
        String(
          schedule.status ??
          ""
        ).toUpperCase();

      if (
        backendStatus ===
        "COMPLETED"
      ) {
        return "COMPLETED";
      }

      const date =
        new Date(
          schedule.plannedDate ??
          schedule.planned_date
        );

      if (
        !Number.isNaN(
          date.getTime()
        )
      ) {

        const today =
          new Date();

        today.setHours(
          0, 0, 0, 0
        );

        date.setHours(
          0, 0, 0, 0
        );

        if (date < today) {
          return "OVERDUE";
        }

        if (
          date.getTime() ===
          today.getTime()
        ) {
          return "DUE TODAY";
        }

        return "UPCOMING";
      }

      return (
        backendStatus ||
        "SCHEDULED"
      );
    };


  const getAsset =
    (schedule) => {

      return (
        schedule.asset?.assetTag ||
        schedule.asset?.asset_tag ||
        schedule.assetTag ||
        schedule.assetId ||
        "-"
      );
    };


  return (

    <div className="page-container maintenance-page">

      <div className="maintenance-hero">

        <div>

          <span className="eyebrow">
            MAINTENANCE CONTROL CENTER
          </span>

          <h1>
            Maintenance Scheduler
          </h1>

          <p>
            Real-time industrial maintenance
            planning, tracking and completion.
          </p>

        </div>


        {canSchedule && (

          <button
            type="button"
            className="add-btn"
            onClick={() =>
              setShowSchedule(true)
            }
          >
            + Schedule Maintenance
          </button>

        )}

      </div>


      <div className="maintenance-live-bar">

        <span className="live-indicator">
          ● LIVE
        </span>

        <span>
          Monitoring maintenance schedules
          automatically
        </span>

        <span>
          Auto refresh: 10 seconds
        </span>

      </div>


      <div className="maintenance-table-card">

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

            {loading ? (

              <tr>
                <td colSpan="6">
                  Loading maintenance data...
                </td>
              </tr>

            ) : schedules.length === 0 ? (

              <tr>
                <td colSpan="6">
                  No maintenance schedules found.
                </td>
              </tr>

            ) : (

              schedules.map(
                (schedule, index) => {

                  const status =
                    getStatus(schedule);

                  return (

                    <tr
                      key={
                        schedule.id ??
                        schedule.scheduleId ??
                        index
                      }
                    >

                      <td>
                        <strong>
                          {getAsset(schedule)}
                        </strong>
                      </td>

                      <td>
                        {schedule.plannedDate ??
                          schedule.planned_date ??
                          "Not scheduled"}
                      </td>

                      <td>
                        {schedule.maintenanceType ??
                          schedule.maintenance_type ??
                          "-"}
                      </td>

                      <td>

                        <span
                          className={
                            `priority-${String(
                              schedule.priority ??
                              "MEDIUM"
                            ).toLowerCase()}`
                          }
                        >
                          {schedule.priority ??
                            "MEDIUM"}
                        </span>

                      </td>


                      <td>

                        <span
                          className={
                            `maintenance-status status-${status
                              .toLowerCase()
                              .replace(
                                /\s/g,
                                "-"
                              )}`
                          }
                        >
                          {status}
                        </span>

                      </td>


                      <td>

                        <div className="action-buttons">

                          <button
                            type="button"
                            className="secondary-btn small"
                            onClick={() =>
                              alert(
                                `Asset: ${getAsset(schedule)}\n` +
                                `Type: ${schedule.maintenanceType ?? "-"}\n` +
                                `Priority: ${schedule.priority ?? "-"}\n` +
                                `Status: ${status}`
                              )
                            }
                          >
                            View
                          </button>


                          {canComplete &&
                            status !==
                              "COMPLETED" && (

                            <button
                              type="button"
                              className="complete-btn"
                              onClick={() =>
                                setSelectedSchedule(
                                  schedule
                                )
                              }
                            >
                              ✓ Complete
                            </button>

                          )}

                          {status ===
                            "OVERDUE" && (

                            <span className="overdue-label">
                              Action Required
                            </span>

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


      {showSchedule && (

        <ScheduleMaintenanceModal
          isOpen={true}
          onClose={() => {
            setShowSchedule(false);
            loadSchedules();
          }}
        />

      )}


      {selectedSchedule && (

        <LogMaintenanceModal
          isOpen={true}
          schedule={
            selectedSchedule
          }
          onClose={() => {
            setSelectedSchedule(null);
            loadSchedules();
          }}
        />

      )}

    </div>
  );
};


export default MaintenanceScheduler;