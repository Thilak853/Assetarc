


// // import React, {
// //   useEffect,
// //   useState,
// // } from "react";

// // import axios from "axios";

// // const Dashboard = () => {
// //   const [stats, setStats] = useState({
// //     totalAssets: 77,
// //     activeAssets: 48,
// //     maintenanceAssets: 16,
// //     criticalAssets: 4,
// //   });

// //   useEffect(() => {
// //     const loadStats = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:8080/api/dashboard/stats"
// //         );

// //         const data =
// //           response?.data || {};

// //         setStats({
// //           totalAssets:
// //             data.totalAssets ??
// //             data.total ??
// //             77,

// //           activeAssets:
// //             data.activeAssets ??
// //             data.operationalAssets ??
// //             48,

// //           maintenanceAssets:
// //             data.maintenanceAssets ??
// //             data.underMaintenance ??
// //             16,

// //           criticalAssets:
// //             data.criticalAssets ??
// //             data.critical ??
// //             4,
// //         });
// //       } catch (error) {
// //         // Keep dashboard usable when
// //         // backend endpoint is unavailable.
// //       }
// //     };

// //     loadStats();
// //   }, []);

// //   const healthData = [
// //     {
// //       label: "Healthy",
// //       value: 68,
// //       className: "healthy",
// //     },
// //     {
// //       label: "Warning",
// //       value: 22,
// //       className: "warning",
// //     },
// //     {
// //       label: "Critical",
// //       value: 10,
// //       className: "critical",
// //     },
// //   ];

// //   const statusData = [
// //     {
// //       label: "Operational",
// //       value: stats.activeAssets,
// //       className: "operational",
// //     },
// //     {
// //       label: "Maintenance",
// //       value: stats.maintenanceAssets,
// //       className: "maintenance",
// //     },
// //     {
// //       label: "Warning",
// //       value: 9,
// //       className: "warning",
// //     },
// //     {
// //       label: "Critical",
// //       value: stats.criticalAssets,
// //       className: "critical",
// //     },
// //   ];

// //   const maintenanceData = [
// //     {
// //       month: "Jan",
// //       scheduled: 12,
// //       completed: 10,
// //     },
// //     {
// //       month: "Feb",
// //       scheduled: 16,
// //       completed: 14,
// //     },
// //     {
// //       month: "Mar",
// //       scheduled: 19,
// //       completed: 17,
// //     },
// //     {
// //       month: "Apr",
// //       scheduled: 14,
// //       completed: 12,
// //     },
// //     {
// //       month: "May",
// //       scheduled: 22,
// //       completed: 20,
// //     },
// //     {
// //       month: "Jun",
// //       scheduled: 18,
// //       completed: 16,
// //     },
// //   ];

// //   const recentAssets = [
// //     {
// //       tag: "CNC-001",
// //       name: "CNC Milling Machine",
// //       category: "CNC Equipment",
// //       status: "Operational",
// //       health: 94,
// //     },
// //     {
// //       tag: "HYD-002",
// //       name: "Hydraulic Press",
// //       category: "Production",
// //       status: "Warning",
// //       health: 72,
// //     },
// //     {
// //       tag: "ROB-003",
// //       name: "Industrial Robotic Arm",
// //       category: "Automation",
// //       status: "Operational",
// //       health: 89,
// //     },
// //     {
// //       tag: "COM-004",
// //       name: "Air Compressor",
// //       category: "Utilities",
// //       status: "Critical",
// //       health: 31,
// //     },
// //   ];

// //   return (
// //     <div className="dashboard-page page-container">

// //       {/* ===============================
// //           3D HERO
// //          =============================== */}

// //       <section className="dashboard-hero">

// //         <div className="hero-grid"></div>

// //         <div className="hero-orb hero-orb-one"></div>
// //         <div className="hero-orb hero-orb-two"></div>
// //         <div className="hero-orb hero-orb-three"></div>

// //         <div className="machine-3d machine-one">
// //           <div className="machine-screen"></div>
// //           <div className="machine-panel"></div>
// //         </div>

// //         <div className="machine-3d machine-two">
// //           <div className="machine-screen"></div>
// //         </div>

// //         <div className="machine-3d machine-three"></div>

// //         <div className="hero-overlay">

// //           <div>

// //             <span className="eyebrow">
// //               ASSETARC SYSTEM
// //             </span>

// //             {/* IMPORTANT FOR T30 */}
// //             <h1>
// //               Fleet Health Overview
// //             </h1>

// //             <p>
// //               Industrial asset lifecycle
// //               monitoring, predictive
// //               maintenance and operational
// //               intelligence.
// //             </p>

// //             <div className="hero-status">
// //               <span className="status-dot"></span>
// //               System Operational
// //             </div>

// //           </div>

// //         </div>

// //       </section>

// //       {/* ===============================
// //           STAT CARDS
// //          =============================== */}

// //       <section className="stat-grid">

// //         <div className="stat-card">
// //           <div className="stat-icon">
// //             ◈
// //           </div>

// //           <div>
// //             <span>Total Assets</span>
// //             <strong>
// //               {stats.totalAssets}
// //             </strong>
// //           </div>
// //         </div>

// //         <div className="stat-card">
// //           <div className="stat-icon">
// //             ✓
// //           </div>

// //           <div>
// //             <span>Operational</span>
// //             <strong>
// //               {stats.activeAssets}
// //             </strong>
// //           </div>
// //         </div>

// //         <div className="stat-card">
// //           <div className="stat-icon">
// //             ⚙
// //           </div>

// //           <div>
// //             <span>Maintenance</span>
// //             <strong>
// //               {stats.maintenanceAssets}
// //             </strong>
// //           </div>
// //         </div>

// //         <div className="stat-card danger-stat">
// //           <div className="stat-icon">
// //             !
// //           </div>

// //           <div>
// //             <span>Critical</span>
// //             <strong>
// //               {stats.criticalAssets}
// //             </strong>
// //           </div>
// //         </div>

// //       </section>

// //       {/* ===============================
// //           GRAPHS
// //          =============================== */}

// //       <section className="dashboard-grid">

// //         {/* HEALTH GRAPH */}

// //         <div className="dashboard-card">

// //           <div className="card-heading">
// //             <div>
// //               <span className="eyebrow">
// //                 HEALTH STATUS
// //               </span>

// //               <h2>
// //                 Asset Health
// //               </h2>
// //             </div>
// //           </div>

// //           <div className="health-chart">

// //             <div className="health-ring">

// //               <div className="health-ring-inner">

// //                 <strong>
// //                   84%
// //                 </strong>

// //                 <span>
// //                   Overall
// //                 </span>

// //               </div>

// //             </div>

// //             <div className="health-legend">

// //               {healthData.map(
// //                 (item) => (
// //                   <div
// //                     className="legend-row"
// //                     key={item.label}
// //                   >

// //                     <span
// //                       className={`legend-dot ${item.className}`}
// //                     ></span>

// //                     <span>
// //                       {item.label}
// //                     </span>

// //                     <strong>
// //                       {item.value}%
// //                     </strong>

// //                   </div>
// //                 )
// //               )}

// //             </div>

// //           </div>

// //         </div>

// //         {/* STATUS GRAPH */}

// //         <div className="dashboard-card">

// //           <div className="card-heading">

// //             <div>

// //               <span className="eyebrow">
// //                 ASSET STATUS
// //               </span>

// //               <h2>
// //                 Operational Distribution
// //               </h2>

// //             </div>

// //           </div>

// //           <div className="bar-chart">

// //             {statusData.map(
// //               (item) => {

// //                 const width =
// //                   Math.min(
// //                     100,
// //                     Math.max(
// //                       8,
// //                       item.value * 1.7
// //                     )
// //                   );

// //                 return (
// //                   <div
// //                     className="bar-row"
// //                     key={item.label}
// //                   >

// //                     <div className="bar-label">
// //                       {item.label}
// //                     </div>

// //                     <div className="bar-track">

// //                       <div
// //                         className={`bar-fill ${item.className}`}
// //                         style={{
// //                           width:
// //                             `${width}%`,
// //                         }}
// //                       ></div>

// //                     </div>

// //                     <strong>
// //                       {item.value}
// //                     </strong>

// //                   </div>
// //                 );
// //               }
// //             )}

// //           </div>

// //         </div>

// //       </section>

// //       {/* ===============================
// //           MAINTENANCE GRAPH
// //          =============================== */}

// //       <section className="dashboard-card full-card">

// //         <div className="card-heading">

// //           <div>

// //             <span className="eyebrow">
// //               MAINTENANCE ANALYTICS
// //             </span>

// //             <h2>
// //               Maintenance Performance
// //             </h2>

// //           </div>

// //         </div>

// //         <div className="maintenance-chart">

// //           {maintenanceData.map(
// //             (item) => (

// //               <div
// //                 className="maintenance-column"
// //                 key={item.month}
// //               >

// //                 <div className="column-values">
// //                   <span>
// //                     {item.scheduled}
// //                   </span>

// //                   <span>
// //                     {item.completed}
// //                   </span>
// //                 </div>

// //                 <div className="columns">

// //                   <div
// //                     className="column scheduled-column"
// //                     style={{
// //                       height:
// //                         `${item.scheduled * 10}px`,
// //                     }}
// //                   ></div>

// //                   <div
// //                     className="column completed-column"
// //                     style={{
// //                       height:
// //                         `${item.completed * 10}px`,
// //                     }}
// //                   ></div>

// //                 </div>

// //                 <span className="month">
// //                   {item.month}
// //                 </span>

// //               </div>

// //             )
// //           )}

// //         </div>

// //         <div className="graph-legend">

// //           <span>
// //             <i className="legend-box scheduled"></i>
// //             Scheduled
// //           </span>

// //           <span>
// //             <i className="legend-box completed"></i>
// //             Completed
// //           </span>

// //         </div>

// //       </section>

// //       {/* ===============================
// //           ASSET TABLE
// //          =============================== */}

// //       <section className="dashboard-card full-card">

// //         <div className="card-heading">

// //           <div>

// //             <span className="eyebrow">
// //               RECENT ASSETS
// //             </span>

// //             <h2>
// //               Industrial Asset Overview
// //             </h2>

// //           </div>

// //           <button
// //             type="button"
// //             className="secondary-btn"
// //           >
// //             View All
// //           </button>

// //         </div>

// //         <div className="dashboard-table-wrapper">

// //           <table className="dashboard-table">

// //             <thead>

// //               <tr>
// //                 <th>Asset Tag</th>
// //                 <th>Asset Name</th>
// //                 <th>Category</th>
// //                 <th>Status</th>
// //                 <th>Health</th>
// //                 <th>Condition</th>
// //               </tr>

// //             </thead>

// //             <tbody>

// //               {recentAssets.map(
// //                 (asset) => (

// //                   <tr key={asset.tag}>

// //                     <td>
// //                       <strong>
// //                         {asset.tag}
// //                       </strong>
// //                     </td>

// //                     <td>
// //                       {asset.name}
// //                     </td>

// //                     <td>
// //                       {asset.category}
// //                     </td>

// //                     <td>

// //                       <span
// //                         className={`table-status ${asset.status.toLowerCase()}`}
// //                       >
// //                         {asset.status}
// //                       </span>

// //                     </td>

// //                     <td>
// //                       {asset.health}%
// //                     </td>

// //                     <td>

// //                       <div className="mini-progress">

// //                         <span
// //                           style={{
// //                             width:
// //                               `${asset.health}%`,
// //                           }}
// //                         ></span>

// //                       </div>

// //                     </td>

// //                   </tr>

// //                 )
// //               )}

// //             </tbody>

// //           </table>

// //         </div>

// //       </section>

// //     </div>
// //   );
// // };

// // export default Dashboard;
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const auth = useSelector((state) => state.auth || {});

//   const username =
//     auth.username ||
//     auth.user?.username ||
//     localStorage.getItem("username") ||
//     "User";

//   const role =
//     auth.role ||
//     auth.user?.role ||
//     localStorage.getItem("role") ||
//     "";

//   const currentRole = String(role).toUpperCase();

//   const isAdmin = currentRole === "SYSTEM_ADMIN";
//   const isManager = currentRole === "ASSET_MANAGER";
//   const isTechnician =
//     currentRole === "MAINTENANCE_TECHNICIAN";
//   const isSupervisor =
//     currentRole === "OPERATIONS_SUPERVISOR";

//   const [stats, setStats] = useState({
//     totalAssets: 77,
//     operational: 48,
//     maintenance: 16,
//     warning: 9,
//     critical: 4,
//     healthScore: 84,
//   });

//   const [assets, setAssets] = useState([]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let active = true;

//     const loadDashboard = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/dashboard/stats"
//         );

//         if (active && response?.data) {
//           setStats((previous) => ({
//             ...previous,
//             ...response.data,
//           }));
//         }
//       } catch (error) {
//         console.log(
//           "Dashboard API unavailable"
//         );
//       }

//       try {
//         const assetResponse = await axios.get(
//           "http://localhost:8080/api/assets"
//         );

//         if (active) {
//           const data = Array.isArray(
//             assetResponse?.data
//           )
//             ? assetResponse.data
//             : assetResponse?.data?.content || [];

//           setAssets(data);
//         }
//       } catch (error) {
//         console.log(
//           "Asset API unavailable"
//         );
//       }

//       if (active) {
//         setLoading(false);
//       }
//     };

//     loadDashboard();

//     return () => {
//       active = false;
//     };
//   }, []);

//   const totalAssets = Number(
//     stats.totalAssets || 0
//   );

//   const operational = Number(
//     stats.operational || 0
//   );

//   const maintenance = Number(
//     stats.maintenance || 0
//   );

//   const warning = Number(
//     stats.warning || 0
//   );

//   const critical = Number(
//     stats.critical || 0
//   );

//   const healthScore = Number(
//     stats.healthScore || 0
//   );

//   const operationalPercent =
//     totalAssets > 0
//       ? Math.round(
//           (operational / totalAssets) * 100
//         )
//       : 0;

//   const maintenancePercent =
//     totalAssets > 0
//       ? Math.round(
//           (maintenance / totalAssets) * 100
//         )
//       : 0;

//   const warningPercent =
//     totalAssets > 0
//       ? Math.round(
//           (warning / totalAssets) * 100
//         )
//       : 0;

//   const criticalPercent =
//     totalAssets > 0
//       ? Math.round(
//           (critical / totalAssets) * 100
//         )
//       : 0;

//   const displayAssets =
//     assets.length > 0
//       ? assets.slice(0, 6)
//       : [
//           {
//             id: 1,
//             assetTag: "CNC-001",
//             name: "CNC Machine",
//             category: "Machinery",
//             status: "OPERATIONAL",
//             health: 92,
//           },
//           {
//             id: 2,
//             assetTag: "MIL-002",
//             name: "Milling Machine",
//             category: "Machinery",
//             status: "MAINTENANCE",
//             health: 76,
//           },
//           {
//             id: 3,
//             assetTag: "LAT-003",
//             name: "Industrial Lathe",
//             category: "Machinery",
//             status: "OPERATIONAL",
//             health: 88,
//           },
//           {
//             id: 4,
//             assetTag: "ROB-004",
//             name: "Robotic Arm",
//             category: "Automation",
//             status: "WARNING",
//             health: 64,
//           },
//           {
//             id: 5,
//             assetTag: "CMP-005",
//             name: "Air Compressor",
//             category: "Utility",
//             status: "OPERATIONAL",
//             health: 91,
//           },
//           {
//             id: 6,
//             assetTag: "GEN-006",
//             name: "Power Generator",
//             category: "Power",
//             status: "CRITICAL",
//             health: 39,
//           },
//         ];

//   const getAssetTag = (asset) =>
//     asset.assetTag ||
//     asset.asset_tag ||
//     asset.tag ||
//     "-";

//   const getAssetStatus = (asset) =>
//     asset.currentStatus ||
//     asset.status ||
//     "OPERATIONAL";

//   const getAssetHealth = (asset) =>
//     asset.currentHealth ??
//     asset.health ??
//     asset.healthScore ??
//     asset.healthPercentage ??
//     0;

//   return (
//     <div className="dashboard-page">

//       {/* =====================================================
//           3D HERO
//       ===================================================== */}

//       <section className="dashboard-hero-3d">

//         <div className="hero-content-3d">

//           <span className="hero-label">
//             ASSETARC INDUSTRIAL INTELLIGENCE
//           </span>

//           <h1>
//             Fleet Health Overview
//           </h1>

//           <p>
//             Industrial asset lifecycle monitoring,
//             predictive maintenance and operational
//             intelligence.
//           </p>

//           <div className="hero-user">
//             <span className="online-dot"></span>

//             Welcome, {username}

//             <span className="hero-role">
//               {currentRole || "USER"}
//             </span>
//           </div>

//         </div>


//         {/* 3D INDUSTRIAL VISUAL */}

//         <div className="industrial-3d-scene">

//           <div className="machine-body">

//             <div className="machine-top"></div>

//             <div className="machine-screen">
//               <span>ASSET</span>
//               <strong>ARC</strong>
//             </div>

//             <div className="machine-light"></div>

//             <div className="machine-panel">
//               <span></span>
//               <span></span>
//               <span></span>
//             </div>

//             <div className="machine-base"></div>

//           </div>


//           <div className="machine-arm">

//             <div className="arm-one"></div>
//             <div className="arm-two"></div>
//             <div className="arm-end"></div>

//           </div>


//           <div className="floating-data data-one">
//             <span>HEALTH</span>
//             <strong>84%</strong>
//           </div>

//           <div className="floating-data data-two">
//             <span>ASSETS</span>
//             <strong>{totalAssets}</strong>
//           </div>

//           <div className="floating-data data-three">
//             <span>STATUS</span>
//             <strong>ONLINE</strong>
//           </div>

//           <div className="scene-grid"></div>

//         </div>

//       </section>


//       {/* =====================================================
//           STAT CARDS
//       ===================================================== */}

//       <section className="dashboard-stat-grid">

//         <div className="dashboard-stat-card blue-card">

//           <div className="stat-3d-icon">
//             ◈
//           </div>

//           <div>
//             <span>Total Assets</span>
//             <strong>{totalAssets}</strong>
//           </div>

//         </div>


//         <div className="dashboard-stat-card green-card">

//           <div className="stat-3d-icon">
//             ✓
//           </div>

//           <div>
//             <span>Operational</span>
//             <strong>{operational}</strong>
//           </div>

//         </div>


//         <div className="dashboard-stat-card orange-card">

//           <div className="stat-3d-icon">
//             ⚙
//           </div>

//           <div>
//             <span>Maintenance</span>
//             <strong>{maintenance}</strong>
//           </div>

//         </div>


//         <div className="dashboard-stat-card red-card">

//           <div className="stat-3d-icon">
//             !
//           </div>

//           <div>
//             <span>Critical</span>
//             <strong>{critical}</strong>
//           </div>

//         </div>

//       </section>


//       {/* =====================================================
//           GRAPHS
//       ===================================================== */}

//       <section className="dashboard-visual-grid">

//         {/* HEALTH 3D CHART */}

//         <div className="dashboard-card health-card">

//           <div className="card-heading">

//             <div>
//               <span>HEALTH ANALYTICS</span>

//               <h2>
//                 Fleet Health
//               </h2>
//             </div>

//             <div className="live-badge">
//               LIVE
//             </div>

//           </div>


//           <div className="health-chart-area">

//             <div
//               className="health-3d-ring"
//               style={{
//                 "--health":
//                   `${healthScore * 3.6}deg`,
//               }}
//             >
//               <div className="health-ring-inner">

//                 <strong>
//                   {healthScore}%
//                 </strong>

//                 <span>
//                   Overall Health
//                 </span>

//               </div>
//             </div>


//             <div className="health-details">

//               <div className="health-item">
//                 <span className="dot healthy-dot"></span>
//                 <span>Healthy</span>
//                 <strong>68%</strong>
//               </div>

//               <div className="health-item">
//                 <span className="dot warning-dot"></span>
//                 <span>Warning</span>
//                 <strong>{warningPercent}%</strong>
//               </div>

//               <div className="health-item">
//                 <span className="dot critical-dot"></span>
//                 <span>Critical</span>
//                 <strong>{criticalPercent}%</strong>
//               </div>

//             </div>

//           </div>

//         </div>


//         {/* 3D BAR GRAPH */}

//         <div className="dashboard-card">

//           <div className="card-heading">

//             <div>
//               <span>ASSET ANALYTICS</span>

//               <h2>
//                 Operational Distribution
//               </h2>
//             </div>

//           </div>


//           <div className="bar-chart-3d">

//             <div className="bar-item">

//               <div className="bar-value">
//                 {operational}
//               </div>

//               <div
//                 className="bar bar-blue"
//                 style={{
//                   height:
//                     `${Math.max(
//                       operationalPercent * 1.8,
//                       20
//                     )}px`,
//                 }}
//               ></div>

//               <span>
//                 Operational
//               </span>

//             </div>


//             <div className="bar-item">

//               <div className="bar-value">
//                 {maintenance}
//               </div>

//               <div
//                 className="bar bar-orange"
//                 style={{
//                   height:
//                     `${Math.max(
//                       maintenancePercent * 1.8,
//                       20
//                     )}px`,
//                 }}
//               ></div>

//               <span>
//                 Maintenance
//               </span>

//             </div>


//             <div className="bar-item">

//               <div className="bar-value">
//                 {warning}
//               </div>

//               <div
//                 className="bar bar-yellow"
//                 style={{
//                   height:
//                     `${Math.max(
//                       warningPercent * 1.8,
//                       20
//                     )}px`,
//                 }}
//               ></div>

//               <span>
//                 Warning
//               </span>

//             </div>


//             <div className="bar-item">

//               <div className="bar-value">
//                 {critical}
//               </div>

//               <div
//                 className="bar bar-red"
//                 style={{
//                   height:
//                     `${Math.max(
//                       criticalPercent * 1.8,
//                       20
//                     )}px`,
//                 }}
//               ></div>

//               <span>
//                 Critical
//               </span>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* =====================================================
//           MAINTENANCE TREND
//       ===================================================== */}

//       <section className="dashboard-card maintenance-chart-card">

//         <div className="card-heading">

//           <div>
//             <span>MAINTENANCE ANALYTICS</span>

//             <h2>
//               Maintenance Activity
//             </h2>
//           </div>

//           <span className="chart-period">
//             LAST 6 MONTHS
//           </span>

//         </div>


//         <div className="line-chart">

//           <div className="chart-y-axis">
//             <span>40</span>
//             <span>30</span>
//             <span>20</span>
//             <span>10</span>
//             <span>0</span>
//           </div>


//           <div className="chart-area">

//             <div className="chart-grid-line"></div>
//             <div className="chart-grid-line"></div>
//             <div className="chart-grid-line"></div>
//             <div className="chart-grid-line"></div>

//             <svg
//               className="maintenance-svg"
//               viewBox="0 0 700 230"
//               preserveAspectRatio="none"
//             >

//               <defs>

//                 <linearGradient
//                   id="areaGradient"
//                   x1="0"
//                   y1="0"
//                   x2="0"
//                   y2="1"
//                 >

//                   <stop
//                     offset="0%"
//                     stopOpacity="0.35"
//                   />

//                   <stop
//                     offset="100%"
//                     stopOpacity="0"
//                   />

//                 </linearGradient>

//               </defs>


//               <path
//                 d="
//                   M0 175
//                   L120 145
//                   L240 160
//                   L360 100
//                   L480 120
//                   L600 55
//                   L700 80
//                   L700 230
//                   L0 230
//                   Z
//                 "
//                 fill="url(#areaGradient)"
//               />


//               <polyline
//                 points="
//                   0,175
//                   120,145
//                   240,160
//                   360,100
//                   480,120
//                   600,55
//                   700,80
//                 "
//                 fill="none"
//                 strokeWidth="4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />


//               <circle
//                 cx="0"
//                 cy="175"
//                 r="5"
//               />

//               <circle
//                 cx="120"
//                 cy="145"
//                 r="5"
//               />

//               <circle
//                 cx="240"
//                 cy="160"
//                 r="5"
//               />

//               <circle
//                 cx="360"
//                 cy="100"
//                 r="5"
//               />

//               <circle
//                 cx="480"
//                 cy="120"
//                 r="5"
//               />

//               <circle
//                 cx="600"
//                 cy="55"
//                 r="5"
//               />

//               <circle
//                 cx="700"
//                 cy="80"
//                 r="5"
//               />

//             </svg>


//             <div className="chart-x-axis">

//               <span>APR</span>
//               <span>MAY</span>
//               <span>JUN</span>
//               <span>JUL</span>
//               <span>AUG</span>
//               <span>SEP</span>
//               <span>OCT</span>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* =====================================================
//           ASSET TABLE
//       ===================================================== */}

//       <section className="dashboard-card asset-table-card">

//         <div className="card-heading">

//           <div>
//             <span>ASSET INVENTORY</span>

//             <h2>
//               Industrial Assets
//             </h2>
//           </div>

//           <button
//             type="button"
//             className="view-all-btn"
//             onClick={() =>
//               navigate("/assets")
//             }
//           >
//             View All →
//           </button>

//         </div>


//         <div className="asset-table-container">

//           <table className="dashboard-asset-table">

//             <thead>

//               <tr>
//                 <th>Asset Tag</th>
//                 <th>Asset Name</th>
//                 <th>Category</th>
//                 <th>Status</th>
//                 <th>Health</th>
//                 <th>Action</th>
//               </tr>

//             </thead>


//             <tbody>

//               {displayAssets.map(
//                 (asset, index) => {

//                   const tag =
//                     getAssetTag(asset);

//                   const name =
//                     asset.name ||
//                     "Industrial Asset";

//                   const category =
//                     asset.category ||
//                     "Industrial";

//                   const status =
//                     getAssetStatus(asset);

//                   const health =
//                     getAssetHealth(asset);

//                   return (
//                     <tr
//                       key={
//                         asset.id ||
//                         asset.assetId ||
//                         index
//                       }
//                     >

//                       <td>
//                         <strong>
//                           {tag}
//                         </strong>
//                       </td>

//                       <td>
//                         {name}
//                       </td>

//                       <td>
//                         {category}
//                       </td>

//                       <td>

//                         <span
//                           className={
//                             `status-pill ${String(
//                               status
//                             ).toLowerCase()}`
//                           }
//                         >
//                           {status}
//                         </span>

//                       </td>

//                       <td>

//                         <div className="table-health">

//                           <div className="mini-progress">

//                             <div
//                               style={{
//                                 width:
//                                   `${Math.min(
//                                     Number(
//                                       health
//                                     ) || 0,
//                                     100
//                                   )}%`,
//                               }}
//                             ></div>

//                           </div>

//                           <span>
//                             {health}%
//                           </span>

//                         </div>

//                       </td>

//                       <td>

//                         <button
//                           type="button"
//                           className="table-view-btn"
//                           onClick={() =>
//                             navigate(
//                               `/assets`
//                             )
//                           }
//                         >
//                           View
//                         </button>

//                       </td>

//                     </tr>
//                   );
//                 }
//               )}

//             </tbody>

//           </table>

//         </div>

//       </section>


//       {/* =====================================================
//           ROLE ACCESS
//       ===================================================== */}

//       <section className="role-access-card">

//         <div>

//           <span>
//             CURRENT ACCESS
//           </span>

//           <h2>
//             {currentRole || "USER"}
//           </h2>

//         </div>


//         <div className="role-permissions">

//           {isAdmin && (
//             <>
//               <span>Asset Management</span>
//               <span>Maintenance</span>
//               <span>Health Monitoring</span>
//               <span>Reports</span>
//               <span>Administration</span>
//             </>
//           )}

//           {isManager && (
//             <>
//               <span>View Assets</span>
//               <span>Add Assets</span>
//               <span>Edit Assets</span>
//               <span>Decommission Assets</span>
//               <span>Schedule Maintenance</span>
//             </>
//           )}

//           {isTechnician && (
//             <>
//               <span>View Assets</span>
//               <span>Maintenance Tasks</span>
//               <span>Complete Maintenance</span>
//               <span>Health Monitoring</span>
//             </>
//           )}

//           {isSupervisor && (
//             <>
//               <span>View Assets</span>
//               <span>Maintenance</span>
//               <span>Monitoring</span>
//               <span>Reports</span>
//             </>
//           )}

//         </div>

//       </section>


//       {loading && (
//         <div
//           className="dashboard-loading"
//           role="status"
//         >
//           Loading dashboard data...
//         </div>
//       )}

//     </div>
//   );
// };

// export default Dashboard;
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState
// } from "react";

// import axios from "axios";
// import {
//   useSelector
// } from "react-redux";

// import {
//   useNavigate
// } from "react-router-dom";

// const API =
//   "http://localhost:8080/api";

// const Dashboard = () => {

//   const navigate =
//     useNavigate();

//   const auth =
//     useSelector(
//       (state) => state.auth || {}
//     );

//   const [assets, setAssets] =
//     useState([]);

//   const [schedules, setSchedules] =
//     useState([]);

//   const [logs, setLogs] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [lastUpdated, setLastUpdated] =
//     useState(null);

//   const username =
//     auth.username ||
//     auth.user?.username ||
//     localStorage.getItem(
//       "username"
//     ) ||
//     "User";

//   const role =
//     auth.role ||
//     auth.user?.role ||
//     localStorage.getItem(
//       "role"
//     ) ||
//     "USER";


//   const getConfig = () => {

//     const token =
//       localStorage.getItem("token") ||
//       localStorage.getItem(
//         "authToken"
//       );

//     return token
//       ? {
//           headers: {
//             Authorization:
//               `Bearer ${token}`
//           }
//         }
//       : {};
//   };


//   const loadDashboard =
//     useCallback(async () => {

//       try {

//         const config =
//           getConfig();

//         const [
//           assetsResponse,
//           scheduleResponse,
//           logsResponse
//         ] = await Promise.all([
//           axios.get(
//             `${API}/assets`,
//             config
//           ),
//           axios.get(
//             `${API}/maintenance/schedules`,
//             config
//           ),
//           axios.get(
//             `${API}/maintenance/logs`,
//             config
//           )
//         ]);

//         const assetData =
//           Array.isArray(
//             assetsResponse.data
//           )
//             ? assetsResponse.data
//             : Array.isArray(
//                 assetsResponse.data?.content
//               )
//             ? assetsResponse.data.content
//             : [];

//         const scheduleData =
//           Array.isArray(
//             scheduleResponse.data
//           )
//             ? scheduleResponse.data
//             : [];

//         const logData =
//           Array.isArray(
//             logsResponse.data
//           )
//             ? logsResponse.data
//             : [];

//         setAssets(assetData);
//         setSchedules(scheduleData);
//         setLogs(logData);

//         setLastUpdated(
//           new Date()
//         );

//       } catch (error) {

//         console.error(
//           "Dashboard loading failed:",
//           error
//         );

//       } finally {

//         setLoading(false);

//       }

//     }, []);


//   useEffect(() => {

//     loadDashboard();

//     const timer =
//       setInterval(
//         loadDashboard,
//         10000
//       );

//     return () =>
//       clearInterval(timer);

//   }, [loadDashboard]);


//   /*
//    * REAL ASSET COUNTS
//    */

//   const statistics =
//     useMemo(() => {

//       const total =
//         assets.length;

//       const operational =
//         assets.filter(
//           (asset) => {

//             const status =
//               String(
//                 asset.currentStatus ??
//                 asset.status ??
//                 ""
//               ).toUpperCase();

//             return [
//               "ACTIVE",
//               "OPERATIONAL",
//               "RUNNING"
//             ].includes(status);

//           }
//         ).length;

//       const maintenance =
//         assets.filter(
//           (asset) => {

//             const status =
//               String(
//                 asset.currentStatus ??
//                 asset.status ??
//                 ""
//               ).toUpperCase();

//             return [
//               "UNDER_MAINTENANCE",
//               "MAINTENANCE",
//               "IN_MAINTENANCE"
//             ].includes(status);

//           }
//         ).length;

//       const critical =
//         assets.filter(
//           (asset) => {

//             const status =
//               String(
//                 asset.currentStatus ??
//                 asset.status ??
//                 ""
//               ).toUpperCase();

//             const health =
//               Number(
//                 asset.currentHealth ??
//                 asset.health ??
//                 asset.healthScore ??
//                 asset.healthPercentage
//               );

//             return (
//               status === "CRITICAL" ||
//               (!Number.isNaN(health) &&
//                 health < 40)
//             );

//           }
//         ).length;

//       const decommissioned =
//         assets.filter(
//           (asset) =>
//             String(
//               asset.currentStatus ??
//               asset.status ??
//               ""
//             ).toUpperCase() ===
//             "DECOMMISSIONED"
//         ).length;

//       return {
//         total,
//         operational,
//         maintenance,
//         critical,
//         decommissioned
//       };

//     }, [assets]);


//   /*
//    * REAL HEALTH
//    */

//   const health =
//     useMemo(() => {

//       const values =
//         assets
//           .map((asset) =>
//             Number(
//               asset.currentHealth ??
//               asset.health ??
//               asset.healthScore ??
//               asset.healthPercentage ??
//               asset.health_percentage
//             )
//           )
//           .filter(
//             (value) =>
//               Number.isFinite(value)
//           );

//       if (!values.length) {
//         return {
//           average: 0,
//           healthy: 0,
//           warning: 0,
//           critical: 0
//         };
//       }

//       const average =
//         Math.round(
//           values.reduce(
//             (a, b) => a + b,
//             0
//           ) / values.length
//         );

//       const healthy =
//         values.filter(
//           (v) => v >= 70
//         ).length;

//       const warning =
//         values.filter(
//           (v) => v >= 40 && v < 70
//         ).length;

//       const critical =
//         values.filter(
//           (v) => v < 40
//         ).length;

//       return {
//         average,
//         healthy,
//         warning,
//         critical
//       };

//     }, [assets]);


//   /*
//    * MAINTENANCE STATUS
//    */

//   const maintenanceStatus =
//     useMemo(() => {

//       const now =
//         new Date();

//       let overdue = 0;
//       let upcoming = 0;
//       let pending = 0;
//       let completed = 0;

//       schedules.forEach(
//         (schedule) => {

//           const status =
//             String(
//               schedule.status ?? ""
//             ).toUpperCase();

//           if (
//             status === "COMPLETED"
//           ) {
//             completed++;
//             return;
//           }

//           const date =
//             new Date(
//               schedule.plannedDate ??
//               schedule.planned_date
//             );

//           if (
//             !Number.isNaN(
//               date.getTime()
//             ) &&
//             date < now
//           ) {
//             overdue++;
//           } else if (
//             !Number.isNaN(
//               date.getTime()
//             )
//           ) {
//             upcoming++;
//           } else {
//             pending++;
//           }

//         }
//       );

//       return {
//         overdue,
//         upcoming,
//         pending,
//         completed
//       };

//     }, [schedules]);


//   return (

//     <div className="dashboard-page">

//       {/* HERO */}

//       <section className="dashboard-hero">

//         <div className="hero-content">

//           <span className="eyebrow">
//             ASSETARC INDUSTRIAL INTELLIGENCE
//           </span>

//           <h1>
//             Fleet Health Overview
//           </h1>

//           <p>
//             Industrial asset lifecycle
//             monitoring, predictive maintenance
//             and operational intelligence.
//           </p>

//           <div className="hero-user">

//             <span className="status-dot" />

//             Welcome, {username}

//             <span className="hero-role">
//               {role}
//             </span>

//           </div>

//           <div className="realtime-status">
//             ● LIVE DATA
//           </div>

//         </div>


//         <div className="hero-machine">

//           <div className="machine-3d">

//             <div className="machine-screen">
//               ARC
//             </div>

//             <div className="machine-light" />

//             <div className="machine-control">
//               <span />
//               <span />
//               <span />
//             </div>

//           </div>

//           <div className="machine-arm" />

//         </div>

//       </section>


//       {/* STAT CARDS */}

//       <section className="stat-grid">

//         <div className="stat-card">

//           <div className="stat-icon">
//             ◈
//           </div>

//           <span>
//             Total Assets
//           </span>

//           <strong>
//             {loading
//               ? "..."
//               : statistics.total}
//           </strong>

//         </div>


//         <div className="stat-card">

//           <div className="stat-icon operational">
//             ✓
//           </div>

//           <span>
//             Operational
//           </span>

//           <strong>
//             {statistics.operational}
//           </strong>

//         </div>


//         <div className="stat-card">

//           <div className="stat-icon maintenance">
//             ⚙
//           </div>

//           <span>
//             Maintenance
//           </span>

//           <strong>
//             {statistics.maintenance}
//           </strong>

//         </div>


//         <div className="stat-card">

//           <div className="stat-icon critical">
//             !
//           </div>

//           <span>
//             Critical
//           </span>

//           <strong>
//             {statistics.critical}
//           </strong>

//         </div>

//       </section>


//       {/* HEALTH + DISTRIBUTION */}

//       <section className="dashboard-two-column">

//         <div className="dashboard-card">

//           <div className="card-heading">

//             <div>
//               <span className="eyebrow">
//                 HEALTH ANALYTICS
//               </span>

//               <h2>
//                 Fleet Health
//               </h2>
//             </div>

//             <span className="live-label">
//               LIVE
//             </span>

//           </div>


//           <div className="health-dashboard">

//             <div
//               className="health-ring"
//               style={{
//                 "--health":
//                   `${health.average}%`
//               }}
//             >

//               <div className="health-ring-inner">

//                 <strong>
//                   {health.average || "—"}%
//                 </strong>

//                 <span>
//                   Average Health
//                 </span>

//               </div>

//             </div>


//             <div className="health-legend">

//               <div>
//                 <span className="legend-dot healthy" />
//                 Healthy
//                 <strong>
//                   {health.healthy}
//                 </strong>
//               </div>

//               <div>
//                 <span className="legend-dot warning" />
//                 Warning
//                 <strong>
//                   {health.warning}
//                 </strong>
//               </div>

//               <div>
//                 <span className="legend-dot critical-dot" />
//                 Critical
//                 <strong>
//                   {health.critical}
//                 </strong>
//               </div>

//             </div>

//           </div>

//         </div>


//         <div className="dashboard-card">

//           <div className="card-heading">

//             <div>
//               <span className="eyebrow">
//                 ASSET ANALYTICS
//               </span>

//               <h2>
//                 Operational Distribution
//               </h2>
//             </div>

//           </div>


//           <div className="distribution">

//             <DistributionBar
//               label="Operational"
//               value={
//                 statistics.operational
//               }
//               total={
//                 statistics.total
//               }
//               className="operational-bar"
//             />

//             <DistributionBar
//               label="Maintenance"
//               value={
//                 statistics.maintenance
//               }
//               total={
//                 statistics.total
//               }
//               className="maintenance-bar"
//             />

//             <DistributionBar
//               label="Critical"
//               value={
//                 statistics.critical
//               }
//               total={
//                 statistics.total
//               }
//               className="critical-bar"
//             />

//             <DistributionBar
//               label="Decommissioned"
//               value={
//                 statistics.decommissioned
//               }
//               total={
//                 statistics.total
//               }
//               className="decommissioned-bar"
//             />

//           </div>

//         </div>

//       </section>


//       {/* MAINTENANCE REAL-TIME */}

//       <section className="dashboard-card">

//         <div className="card-heading">

//           <div>

//             <span className="eyebrow">
//               MAINTENANCE ANALYTICS
//             </span>

//             <h2>
//               Maintenance Activity
//             </h2>

//           </div>

//           <button
//             type="button"
//             className="secondary-btn"
//             onClick={() =>
//               navigate("/maintenance")
//             }
//           >
//             View Maintenance
//           </button>

//         </div>


//         <div className="maintenance-dashboard">

//           <div className="maintenance-box overdue">
//             <span>Overdue</span>
//             <strong>
//               {maintenanceStatus.overdue}
//             </strong>
//           </div>

//           <div className="maintenance-box upcoming">
//             <span>Upcoming</span>
//             <strong>
//               {maintenanceStatus.upcoming}
//             </strong>
//           </div>

//           <div className="maintenance-box pending">
//             <span>Pending</span>
//             <strong>
//               {maintenanceStatus.pending}
//             </strong>
//           </div>

//           <div className="maintenance-box completed">
//             <span>Completed</span>
//             <strong>
//               {maintenanceStatus.completed}
//             </strong>
//           </div>

//         </div>

//       </section>


//       {/* REAL ASSET TABLE */}

//       <section className="dashboard-card">

//         <div className="card-heading">

//           <div>

//             <span className="eyebrow">
//               LIVE ASSET DATA
//             </span>

//             <h2>
//               Industrial Asset Status
//             </h2>

//           </div>

//           <button
//             type="button"
//             className="secondary-btn"
//             onClick={() =>
//               navigate("/assets")
//             }
//           >
//             View All Assets
//           </button>

//         </div>


//         <div className="dashboard-table-wrapper">

//           <table className="dashboard-table">

//             <thead>
//               <tr>
//                 <th>Asset</th>
//                 <th>Name</th>
//                 <th>Status</th>
//                 <th>Health</th>
//               </tr>
//             </thead>

//             <tbody>

//               {assets
//                 .slice(0, 8)
//                 .map(
//                   (asset, index) => {

//                     const tag =
//                       asset.assetTag ??
//                       asset.asset_tag ??
//                       "-";

//                     const name =
//                       asset.name ??
//                       "-";

//                     const status =
//                       asset.currentStatus ??
//                       asset.status ??
//                       "UNKNOWN";

//                     const healthValue =
//                       asset.currentHealth ??
//                       asset.health ??
//                       asset.healthScore ??
//                       asset.healthPercentage;

//                     return (

//                       <tr
//                         key={
//                           asset.id ??
//                           asset.assetId ??
//                           index
//                         }
//                       >

//                         <td>
//                           {tag}
//                         </td>

//                         <td>
//                           {name}
//                         </td>

//                         <td>
//                           <span className="status-pill">
//                             {status}
//                           </span>
//                         </td>

//                         <td>
//                           {healthValue != null
//                             ? `${healthValue}%`
//                             : "No metric"}
//                         </td>

//                       </tr>

//                     );

//                   }
//                 )}

//             </tbody>

//           </table>

//         </div>

//       </section>


//       <div className="last-updated">

//         ● Live

//         {lastUpdated &&
//           ` • Updated ${lastUpdated.toLocaleTimeString()}`}

//       </div>

//     </div>
//   );
// };


// const DistributionBar = ({
//   label,
//   value,
//   total,
//   className
// }) => {

//   const percentage =
//     total > 0
//       ? Math.round(
//           (value / total) * 100
//         )
//       : 0;

//   return (

//     <div className="distribution-row">

//       <div className="distribution-label">
//         <span>{label}</span>
//         <strong>{value}</strong>
//       </div>

//       <div className="distribution-track">

//         <div
//           className={
//             `distribution-fill ${className}`
//           }
//           style={{
//             width:
//               `${percentage}%`
//           }}
//         />

//       </div>

//       <span className="distribution-percent">
//         {percentage}%
//       </span>

//     </div>
//   );
// };


// export default Dashboard;
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import axios from "axios";
import {
  useSelector
} from "react-redux";

import {
  useNavigate
} from "react-router-dom";

const API =
  "http://localhost:8080/api";

const Dashboard = () => {

  const navigate =
    useNavigate();

  const auth =
    useSelector(
      (state) => state.auth || {}
    );

  const [assets, setAssets] =
    useState([]);

  const [schedules, setSchedules] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [lastUpdated, setLastUpdated] =
    useState(null);

  const username =
    auth.username ||
    auth.user?.username ||
    localStorage.getItem(
      "username"
    ) ||
    "User";

  const role =
    auth.role ||
    auth.user?.role ||
    localStorage.getItem(
      "role"
    ) ||
    "USER";


  /*
   * GET AUTHENTICATION CONFIG
   */

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


  /*
   * LOAD REAL DASHBOARD DATA
   */

  const loadDashboard =
    useCallback(async () => {

      try {

        const config =
          getConfig();

        const [
          assetsResponse,
          scheduleResponse
        ] = await Promise.all([
          axios.get(
            `${API}/assets`,
            config
          ),

          axios.get(
            `${API}/maintenance/schedules`,
            config
          )
        ]);


        /*
         * ASSET DATA
         */

        const assetData =
          Array.isArray(
            assetsResponse.data
          )
            ? assetsResponse.data
            : Array.isArray(
                assetsResponse.data?.content
              )
            ? assetsResponse.data.content
            : [];


        /*
         * MAINTENANCE SCHEDULE DATA
         */

        const scheduleData =
          Array.isArray(
            scheduleResponse.data
          )
            ? scheduleResponse.data
            : Array.isArray(
                scheduleResponse.data?.content
              )
            ? scheduleResponse.data.content
            : [];


        setAssets(
          assetData
        );

        setSchedules(
          scheduleData
        );


        setLastUpdated(
          new Date()
        );

      } catch (error) {

        console.error(
          "Dashboard loading failed:",
          error
        );

      } finally {

        setLoading(
          false
        );

      }

    }, []);


  /*
   * REAL-TIME REFRESH
   */

  useEffect(() => {

    loadDashboard();

    const timer =
      setInterval(
        loadDashboard,
        10000
      );

    return () =>
      clearInterval(timer);

  }, [loadDashboard]);


  /*
   * REAL ASSET COUNTS
   */

  const statistics =
    useMemo(() => {

      const total =
        assets.length;


      const operational =
        assets.filter(
          (asset) => {

            const status =
              String(
                asset.currentStatus ??
                asset.status ??
                ""
              ).toUpperCase();

            return [
              "ACTIVE",
              "OPERATIONAL",
              "RUNNING"
            ].includes(
              status
            );

          }
        ).length;


      const maintenance =
        assets.filter(
          (asset) => {

            const status =
              String(
                asset.currentStatus ??
                asset.status ??
                ""
              ).toUpperCase();

            return [
              "UNDER_MAINTENANCE",
              "MAINTENANCE",
              "IN_MAINTENANCE"
            ].includes(
              status
            );

          }
        ).length;


      const critical =
        assets.filter(
          (asset) => {

            const status =
              String(
                asset.currentStatus ??
                asset.status ??
                ""
              ).toUpperCase();


            const health =
              Number(
                asset.currentHealth ??
                asset.health ??
                asset.healthScore ??
                asset.healthPercentage
              );


            return (
              status === "CRITICAL" ||
              (
                !Number.isNaN(
                  health
                ) &&
                health < 40
              )
            );

          }
        ).length;


      const decommissioned =
        assets.filter(
          (asset) =>
            String(
              asset.currentStatus ??
              asset.status ??
              ""
            ).toUpperCase() ===
            "DECOMMISSIONED"
        ).length;


      return {
        total,
        operational,
        maintenance,
        critical,
        decommissioned
      };

    }, [assets]);


  /*
   * REAL HEALTH ANALYTICS
   */

  const health =
    useMemo(() => {

      const values =
        assets
          .map(
            (asset) =>
              Number(
                asset.currentHealth ??
                asset.health ??
                asset.healthScore ??
                asset.healthPercentage ??
                asset.health_percentage
              )
          )
          .filter(
            (value) =>
              Number.isFinite(
                value
              )
          );


      if (!values.length) {

        return {
          average: 0,
          healthy: 0,
          warning: 0,
          critical: 0
        };

      }


      const average =
        Math.round(
          values.reduce(
            (a, b) =>
              a + b,
            0
          ) /
          values.length
        );


      const healthy =
        values.filter(
          (v) =>
            v >= 70
        ).length;


      const warning =
        values.filter(
          (v) =>
            v >= 40 &&
            v < 70
        ).length;


      const critical =
        values.filter(
          (v) =>
            v < 40
        ).length;


      return {
        average,
        healthy,
        warning,
        critical
      };

    }, [assets]);


  /*
   * MAINTENANCE STATUS
   */

  const maintenanceStatus =
    useMemo(() => {

      const now =
        new Date();

      let overdue = 0;
      let upcoming = 0;
      let pending = 0;
      let completed = 0;


      schedules.forEach(
        (schedule) => {

          const status =
            String(
              schedule.status ??
              ""
            ).toUpperCase();


          if (
            status ===
            "COMPLETED"
          ) {

            completed++;

            return;

          }


          const date =
            new Date(
              schedule.plannedDate ??
              schedule.planned_date
            );


          if (
            !Number.isNaN(
              date.getTime()
            ) &&
            date < now
          ) {

            overdue++;

          } else if (
            !Number.isNaN(
              date.getTime()
            )
          ) {

            upcoming++;

          } else {

            pending++;

          }

        }
      );


      return {
        overdue,
        upcoming,
        pending,
        completed
      };

    }, [schedules]);


  return (

    <div className="dashboard-page">

      {/* ================= HERO ================= */}

      <section className="dashboard-hero">

        <div className="hero-content">

          <span className="eyebrow">
            ASSETARC INDUSTRIAL INTELLIGENCE
          </span>


          <h1>
            Fleet Health Overview
          </h1>


          <p>
            Industrial asset lifecycle
            monitoring, predictive maintenance
            and operational intelligence.
          </p>


          <div className="hero-user">

            <span className="status-dot" />

            Welcome, {username}

            <span className="hero-role">
              {role}
            </span>

          </div>


          <div className="realtime-status">
            ● LIVE DATA
          </div>

        </div>


        {/* 3D MACHINE */}

        <div className="hero-machine">

          <div className="machine-3d">

            <div className="machine-screen">
              ARC
            </div>


            <div className="machine-light" />


            <div className="machine-control">

              <span />
              <span />
              <span />

            </div>

          </div>


          <div className="machine-arm" />

        </div>

      </section>


      {/* ================= STAT CARDS ================= */}

      <section className="stat-grid">

        <div className="stat-card">

          <div className="stat-icon">
            ◈
          </div>


          <span>
            Total Assets
          </span>


          <strong>
            {loading
              ? "..."
              : statistics.total}
          </strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon operational">
            ✓
          </div>


          <span>
            Operational
          </span>


          <strong>
            {statistics.operational}
          </strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon maintenance">
            ⚙
          </div>


          <span>
            Maintenance
          </span>


          <strong>
            {statistics.maintenance}
          </strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon critical">
            !
          </div>


          <span>
            Critical
          </span>


          <strong>
            {statistics.critical}
          </strong>

        </div>

      </section>


      {/* ================= HEALTH + DISTRIBUTION ================= */}

      <section className="dashboard-two-column">


        {/* HEALTH */}

        <div className="dashboard-card">

          <div className="card-heading">

            <div>

              <span className="eyebrow">
                HEALTH ANALYTICS
              </span>


              <h2>
                Fleet Health
              </h2>

            </div>


            <span className="live-label">
              LIVE
            </span>

          </div>


          <div className="health-dashboard">

            <div
              className="health-ring"
              style={{
                "--health":
                  `${health.average}%`
              }}
            >

              <div className="health-ring-inner">

                <strong>
                  {health.average || "—"}%
                </strong>


                <span>
                  Average Health
                </span>

              </div>

            </div>


            <div className="health-legend">

              <div>

                <span className="legend-dot healthy" />

                Healthy

                <strong>
                  {health.healthy}
                </strong>

              </div>


              <div>

                <span className="legend-dot warning" />

                Warning

                <strong>
                  {health.warning}
                </strong>

              </div>


              <div>

                <span className="legend-dot critical-dot" />

                Critical

                <strong>
                  {health.critical}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* DISTRIBUTION */}

        <div className="dashboard-card">

          <div className="card-heading">

            <div>

              <span className="eyebrow">
                ASSET ANALYTICS
              </span>


              <h2>
                Operational Distribution
              </h2>

            </div>

          </div>


          <div className="distribution">

            <DistributionBar
              label="Operational"
              value={
                statistics.operational
              }
              total={
                statistics.total
              }
              className="operational-bar"
            />


            <DistributionBar
              label="Maintenance"
              value={
                statistics.maintenance
              }
              total={
                statistics.total
              }
              className="maintenance-bar"
            />


            <DistributionBar
              label="Critical"
              value={
                statistics.critical
              }
              total={
                statistics.total
              }
              className="critical-bar"
            />


            <DistributionBar
              label="Decommissioned"
              value={
                statistics.decommissioned
              }
              total={
                statistics.total
              }
              className="decommissioned-bar"
            />

          </div>

        </div>

      </section>


      {/* ================= MAINTENANCE ================= */}

      <section className="dashboard-card">

        <div className="card-heading">

          <div>

            <span className="eyebrow">
              MAINTENANCE ANALYTICS
            </span>


            <h2>
              Maintenance Activity
            </h2>

          </div>


          <button
            type="button"
            className="secondary-btn"
            onClick={() =>
              navigate(
                "/maintenance"
              )
            }
          >
            View Maintenance
          </button>

        </div>


        <div className="maintenance-dashboard">

          <div className="maintenance-box overdue">

            <span>
              Overdue
            </span>

            <strong>
              {maintenanceStatus.overdue}
            </strong>

          </div>


          <div className="maintenance-box upcoming">

            <span>
              Upcoming
            </span>

            <strong>
              {maintenanceStatus.upcoming}
            </strong>

          </div>


          <div className="maintenance-box pending">

            <span>
              Pending
            </span>

            <strong>
              {maintenanceStatus.pending}
            </strong>

          </div>


          <div className="maintenance-box completed">

            <span>
              Completed
            </span>

            <strong>
              {maintenanceStatus.completed}
            </strong>

          </div>

        </div>

      </section>


      {/* ================= ASSET TABLE ================= */}

      <section className="dashboard-card">

        <div className="card-heading">

          <div>

            <span className="eyebrow">
              LIVE ASSET DATA
            </span>


            <h2>
              Industrial Asset Status
            </h2>

          </div>


          <button
            type="button"
            className="secondary-btn"
            onClick={() =>
              navigate(
                "/assets"
              )
            }
          >
            View All Assets
          </button>

        </div>


        <div className="dashboard-table-wrapper">

          <table className="dashboard-table">

            <thead>

              <tr>

                <th>
                  Asset
                </th>

                <th>
                  Name
                </th>

                <th>
                  Status
                </th>

                <th>
                  Health
                </th>

              </tr>

            </thead>


            <tbody>

              {assets
                .slice(0, 8)
                .map(
                  (
                    asset,
                    index
                  ) => {

                    const tag =
                      asset.assetTag ??
                      asset.asset_tag ??
                      "-";


                    const name =
                      asset.name ??
                      "-";


                    const status =
                      asset.currentStatus ??
                      asset.status ??
                      "UNKNOWN";


                    const healthValue =
                      asset.currentHealth ??
                      asset.health ??
                      asset.healthScore ??
                      asset.healthPercentage;


                    return (

                      <tr
                        key={
                          asset.id ??
                          asset.assetId ??
                          index
                        }
                      >

                        <td>
                          {tag}
                        </td>


                        <td>
                          {name}
                        </td>


                        <td>

                          <span className="status-pill">
                            {status}
                          </span>

                        </td>


                        <td>

                          {healthValue != null
                            ? `${healthValue}%`
                            : "No metric"}

                        </td>

                      </tr>

                    );

                  }
                )}

            </tbody>

          </table>

        </div>

      </section>


      {/* ================= LAST UPDATED ================= */}

      <div className="last-updated">

        ● Live

        {lastUpdated &&
          ` • Updated ${lastUpdated.toLocaleTimeString()}`}

      </div>

    </div>
  );
};


/*
 * ================= DISTRIBUTION BAR =================
 */

const DistributionBar = ({
  label,
  value,
  total,
  className
}) => {

  const percentage =
    total > 0
      ? Math.round(
          (value / total) * 100
        )
      : 0;


  return (

    <div className="distribution-row">

      <div className="distribution-label">

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

      </div>


      <div className="distribution-track">

        <div
          className={
            `distribution-fill ${className}`
          }
          style={{
            width:
              `${percentage}%`
          }}
        />

      </div>


      <span className="distribution-percent">

        {percentage}%

      </span>

    </div>

  );
};


export default Dashboard;