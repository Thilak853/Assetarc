


// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import axios from "axios";

// const API = "http://localhost:8080/api";

// const HealthMonitor = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const getToken = () => {
//     return (
//       localStorage.getItem("token") ||
//       localStorage.getItem("authToken")
//     );
//   };

//   const getConfig = () => {
//     const token = getToken();

//     return token
//       ? {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       : {};
//   };

//   const loadAssets = useCallback(
//     async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response =
//           await axios.get(
//             `${API}/assets?page=0&size=1000`,
//             getConfig()
//           );

//         const data = response.data;

//         let list = [];

//         if (Array.isArray(data)) {
//           list = data;
//         } else if (
//           Array.isArray(data?.content)
//         ) {
//           list = data.content;
//         } else if (
//           Array.isArray(data?.data)
//         ) {
//           list = data.data;
//         }

//         setAssets(list);
//       } catch (err) {
//         console.error(
//           "Health monitor error:",
//           err
//         );

//         setError(
//           err?.response?.data?.message ||
//             err?.message ||
//             "Unable to load asset health information."
//         );

//         setAssets([]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   useEffect(() => {
//     loadAssets();
//   }, [loadAssets]);

//   const getHealth = (asset) => {
//     const value =
//       asset?.currentHealth ??
//       asset?.health ??
//       asset?.healthScore ??
//       asset?.healthPercentage ??
//       asset?.health_percentage;

//     if (
//       value === null ||
//       value === undefined ||
//       value === ""
//     ) {
//       return null;
//     }

//     const number = Number(value);

//     return Number.isFinite(number)
//       ? number
//       : null;
//   };

//   const getStatus = (asset) => {
//     return (
//       asset?.currentStatus ??
//       asset?.status ??
//       "-"
//     );
//   };

//   const getAssetTag = (asset) => {
//     return (
//       asset?.assetTag ??
//       asset?.asset_tag ??
//       asset?.tag ??
//       "-"
//     );
//   };

//   const getName = (asset) => {
//     return asset?.name ?? "-";
//   };

//   const getCategory = (asset) => {
//     return asset?.category ?? "-";
//   };

//   const activeAssets = useMemo(
//     () =>
//       assets.filter(
//         (asset) =>
//           String(
//             getStatus(asset)
//           ).toUpperCase() !==
//           "DECOMMISSIONED"
//       ),
//     [assets]
//   );

//   const healthValues = activeAssets
//     .map((asset) => getHealth(asset))
//     .filter(
//       (value) =>
//         value !== null
//     );

//   const averageHealth =
//     healthValues.length > 0
//       ? Math.round(
//           healthValues.reduce(
//             (sum, value) =>
//               sum + value,
//             0
//           ) /
//             healthValues.length
//         )
//       : 0;

//   const healthyCount =
//     activeAssets.filter(
//       (asset) => {
//         const health =
//           getHealth(asset);

//         return (
//           health !== null &&
//           health >= 70
//         );
//       }
//     ).length;

//   const attentionCount =
//     activeAssets.filter(
//       (asset) => {
//         const health =
//           getHealth(asset);

//         return (
//           health !== null &&
//           health >= 40 &&
//           health < 70
//         );
//       }
//     ).length;

//   const criticalCount =
//     activeAssets.filter(
//       (asset) => {
//         const health =
//           getHealth(asset);

//         return (
//           health !== null &&
//           health < 40
//         );
//       }
//     ).length;

//   const getHealthClass = (health) => {
//     if (health === null) {
//       return "unknown";
//     }

//     if (health >= 70) {
//       return "healthy";
//     }

//     if (health >= 40) {
//       return "warning";
//     }

//     return "critical";
//   };

//   const getHealthLabel = (health) => {
//     if (health === null) {
//       return "No Data";
//     }

//     if (health >= 70) {
//       return "Healthy";
//     }

//     if (health >= 40) {
//       return "Needs Attention";
//     }

//     return "Critical";
//   };

//   return (
//     <div className="health-page page-container">

//       {/* =========================
//           HEADER
//           ========================= */}

//       <div className="health-page-header">

//         <div>
//           <span className="eyebrow">
//             CONDITION MONITORING
//           </span>

//           <h1>
//             Health Monitor
//           </h1>

//           <p>
//             Real-time condition overview
//             of industrial assets.
//           </p>
//         </div>

//         <button
//           type="button"
//           className="add-btn refresh-btn"
//           onClick={loadAssets}
//           disabled={loading}
//         >
//           {loading
//             ? "Refreshing..."
//             : "Refresh"}
//         </button>

//       </div>


//       {/* =========================
//           SUMMARY
//           ========================= */}

//       <section className="health-summary-grid">

//         <div className="health-summary-card">

//           <span>
//             Average Health
//           </span>

//           <strong>
//             {averageHealth}%
//           </strong>

//         </div>


//         <div className="health-summary-card">

//           <span>
//             Healthy
//           </span>

//           <strong className="healthy-number">
//             {healthyCount}
//           </strong>

//         </div>


//         <div className="health-summary-card">

//           <span>
//             Needs Attention
//           </span>

//           <strong className="warning-number">
//             {attentionCount}
//           </strong>

//         </div>


//         <div className="health-summary-card">

//           <span>
//             Critical
//           </span>

//           <strong className="critical-number">
//             {criticalCount}
//           </strong>

//         </div>

//       </section>


//       {/* =========================
//           GRAPH
//           ========================= */}

//       <section className="health-card">

//         <div className="health-card-heading">

//           <div>
//             <span className="eyebrow">
//               HEALTH ANALYTICS
//             </span>

//             <h2>
//               Asset Health Distribution
//             </h2>
//           </div>

//         </div>


//         <div className="health-graph">

//           <div className="health-axis">
//             <span>100%</span>
//             <span>75%</span>
//             <span>50%</span>
//             <span>25%</span>
//             <span>0%</span>
//           </div>


//           <div className="health-bars">

//             {activeAssets
//               .slice(0, 20)
//               .map(
//                 (asset, index) => {

//                   const health =
//                     getHealth(asset) ??
//                     0;

//                   return (
//                     <div
//                       className="health-bar-column"
//                       key={
//                         asset?.id ??
//                         asset?.assetId ??
//                         index
//                       }
//                     >

//                       <div className="health-bar-value">
//                         {health}%
//                       </div>

//                       <div className="health-bar-track">

//                         <div
//                           className={`health-bar-fill ${getHealthClass(
//                             health
//                           )}`}
//                           style={{
//                             height:
//                               `${Math.max(
//                                 4,
//                                 Math.min(
//                                   100,
//                                   health
//                                 )
//                               )}%`,
//                           }}
//                         ></div>

//                       </div>

//                       <span>
//                         {getAssetTag(asset)}
//                       </span>

//                     </div>
//                   );
//                 }
//               )}

//           </div>

//         </div>

//       </section>


//       {/* =========================
//           TABLE
//           ========================= */}

//       <section className="health-card">

//         <div className="health-card-heading">

//           <div>
//             <span className="eyebrow">
//               ASSET HEALTH DETAILS
//             </span>

//             <h2>
//               Industrial Asset Health
//             </h2>

//             <p>
//               Current health condition of
//               each industrial asset.
//             </p>
//           </div>

//         </div>


//         {error && (
//           <div
//             className="error-message"
//             role="alert"
//           >
//             {error}
//           </div>
//         )}


//         {loading ? (

//           <div
//             className="loading-spinner"
//             role="status"
//           >
//             Loading health information...
//           </div>

//         ) : activeAssets.length === 0 ? (

//           <div className="empty-state">
//             No health data available.
//           </div>

//         ) : (

//           <div className="health-table-wrapper">

//             <table className="health-table">

//               <thead>

//                 <tr>
//                   <th>Asset Tag</th>
//                   <th>Asset Name</th>
//                   <th>Category</th>
//                   <th>Status</th>
//                   <th>Health Score</th>
//                   <th>Condition</th>
//                   <th>Health Level</th>
//                 </tr>

//               </thead>


//               <tbody>

//                 {activeAssets.map(
//                   (asset, index) => {

//                     const health =
//                       getHealth(asset);

//                     const status =
//                       getStatus(asset);

//                     const healthClass =
//                       getHealthClass(
//                         health
//                       );

//                     return (
//                       <tr
//                         key={
//                           asset?.id ??
//                           asset?.assetId ??
//                           index
//                         }
//                       >

//                         <td>
//                           <strong>
//                             {getAssetTag(
//                               asset
//                             )}
//                           </strong>
//                         </td>


//                         <td>
//                           {getName(asset)}
//                         </td>


//                         <td>
//                           {getCategory(
//                             asset
//                           )}
//                         </td>


//                         <td>
//                           <span className="health-status-badge">
//                             {String(
//                               status
//                             ).replace(
//                               /_/g,
//                               " "
//                             )}
//                           </span>
//                         </td>


//                         <td>

//                           <div className="health-score-cell">

//                             <strong
//                               className={`health-score ${healthClass}`}
//                             >
//                               {health !== null
//                                 ? `${health}%`
//                                 : "N/A"}
//                             </strong>

//                             <div className="health-progress">

//                               <span
//                                 className={
//                                   healthClass
//                                 }
//                                 style={{
//                                   width:
//                                     health !==
//                                     null
//                                       ? `${Math.max(
//                                           0,
//                                           Math.min(
//                                             100,
//                                             health
//                                           )
//                                         )}%`
//                                       : "0%",
//                                 }}
//                               ></span>

//                             </div>

//                           </div>

//                         </td>


//                         <td>

//                           <span
//                             className={`condition-badge ${healthClass}`}
//                           >
//                             {getHealthLabel(
//                               health
//                             )}
//                           </span>

//                         </td>


//                         <td>

//                           <div className="health-meter">

//                             <span
//                               className={
//                                 healthClass
//                               }
//                             ></span>

//                             <span
//                               className={
//                                 healthClass
//                               }
//                             ></span>

//                             <span
//                               className={
//                                 healthClass
//                               }
//                             ></span>

//                             <span
//                               className={
//                                 healthClass
//                               }
//                             ></span>

//                             <span
//                               className={
//                                 healthClass
//                               }
//                             ></span>

//                           </div>

//                         </td>

//                       </tr>
//                     );
//                   }
//                 )}

//               </tbody>

//             </table>

//           </div>

//         )}

//       </section>

//     </div>
//   );
// };

// export default HealthMonitor;
// // import React, {
// //   useEffect,
// //   useState,
// // } from "react";

// // import axios from "axios";

// // const HealthMonitor = () => {

// //   const [assets, setAssets] =
// //     useState([]);

// //   const [loading, setLoading] =
// //     useState(true);

// //   const loadHealth = async () => {

// //     setLoading(true);

// //     try {

// //       const response =
// //         await axios.get(
// //           "http://localhost:8080/api/assets"
// //         );

// //       const data =
// //         Array.isArray(response?.data)
// //           ? response.data
// //           : Array.isArray(response?.data?.content)
// //           ? response.data.content
// //           : [];

// //       const formatted =
// //         data.map(
// //           (asset) => {

// //             const health = Number(
// //               asset?.currentHealth ??
// //               asset?.health ??
// //               asset?.healthScore ??
// //               asset?.healthPercentage ??
// //               0
// //             );

// //             return {
// //               id:
// //                 asset?.id ??
// //                 asset?.assetId ??
// //                 Math.random(),

// //               tag:
// //                 asset?.assetTag ??
// //                 asset?.asset_tag ??
// //                 asset?.tag ??
// //                 "-",

// //               name:
// //                 asset?.name ??
// //                 "-",

// //               category:
// //                 asset?.category ??
// //                 "-",

// //               status:
// //                 asset?.currentStatus ??
// //                 asset?.status ??
// //                 "UNKNOWN",

// //               health:
// //                 Number.isFinite(health)
// //                   ? Math.max(
// //                       0,
// //                       Math.min(
// //                         100,
// //                         health
// //                       )
// //                     )
// //                   : 0,
// //             };
// //           }
// //         );

// //       setAssets(formatted);

// //     } catch (error) {

// //       /*
// //        * Do not crash the page if
// //        * backend is unavailable.
// //        */
// //       setAssets([]);

// //     } finally {

// //       setLoading(false);

// //     }
// //   };

// //   useEffect(() => {
// //     loadHealth();
// //   }, []);

// //   const total =
// //     assets.length;

// //   const average =
// //     total > 0
// //       ? Math.round(
// //           assets.reduce(
// //             (sum, asset) =>
// //               sum + asset.health,
// //             0
// //           ) / total
// //         )
// //       : 0;

// //   const healthy =
// //     assets.filter(
// //       (asset) =>
// //         asset.health >= 70
// //     ).length;

// //   const attention =
// //     assets.filter(
// //       (asset) =>
// //         asset.health >= 40 &&
// //         asset.health < 70
// //     ).length;

// //   const critical =
// //     assets.filter(
// //       (asset) =>
// //         asset.health < 40
// //     ).length;

// //   return (
// //     <div className="health-page page-container">

// //       {/* =========================
// //           HEADER
// //          ========================= */}

// //       <div className="health-header">

// //         <div>

// //           <span className="eyebrow">
// //             CONDITION MONITORING
// //           </span>

// //           <h1>
// //             Health Monitor
// //           </h1>

// //           <p>
// //             Real-time condition overview
// //             of industrial assets.
// //           </p>

// //         </div>

// //         <button
// //           type="button"
// //           className="add-btn"
// //           onClick={loadHealth}
// //         >
// //           Refresh
// //         </button>

// //       </div>

// //       {/* =========================
// //           SUMMARY
// //          ========================= */}

// //       <section className="health-summary-grid">

// //         <div className="health-stat-card">

// //           <span>
// //             Average Health
// //           </span>

// //           <strong>
// //             {average}%
// //           </strong>

// //         </div>

// //         <div className="health-stat-card">

// //           <span>
// //             Healthy
// //           </span>

// //           <strong>
// //             {healthy}
// //           </strong>

// //         </div>

// //         <div className="health-stat-card">

// //           <span>
// //             Needs Attention
// //           </span>

// //           <strong>
// //             {attention}
// //           </strong>

// //         </div>

// //         <div className="health-stat-card critical-health">

// //           <span>
// //             Critical
// //           </span>

// //           <strong>
// //             {critical}
// //           </strong>

// //         </div>

// //       </section>

// //       {/* =========================
// //           HEALTH GRAPH
// //          ========================= */}

// //       <section className="dashboard-card health-graph-card">

// //         <div className="card-heading">

// //           <div>

// //             <span className="eyebrow">
// //               HEALTH ANALYTICS
// //             </span>

// //             <h2>
// //               Asset Health Distribution
// //             </h2>

// //           </div>

// //         </div>

// //         <div className="health-bars">

// //           {assets.length === 0 ? (

// //             <div className="empty-state">
// //               No health data available.
// //             </div>

// //           ) : (

// //             assets
// //               .slice(0, 12)
// //               .map(
// //                 (asset) => (

// //                   <div
// //                     className="health-bar-item"
// //                     key={asset.id}
// //                   >

// //                     <div className="health-bar-info">

// //                       <strong>
// //                         {asset.tag}
// //                       </strong>

// //                       <span>
// //                         {asset.health}%
// //                       </span>

// //                     </div>

// //                     <div className="health-bar-track">

// //                       <div
// //                         className={
// //                           asset.health < 40
// //                             ? "health-bar-fill critical"
// //                             : asset.health < 70
// //                             ? "health-bar-fill warning"
// //                             : "health-bar-fill healthy"
// //                         }
// //                         style={{
// //                           width:
// //                             `${asset.health}%`,
// //                         }}
// //                       ></div>

// //                     </div>

// //                   </div>

// //                 )
// //               )

// //           )}

// //         </div>

// //       </section>

// //       {/* =========================
// //           HEALTH TABLE
// //          ========================= */}

// //       <section className="dashboard-card full-card">

// //         <div className="card-heading">

// //           <div>

// //             <span className="eyebrow">
// //               CONDITION MONITORING
// //             </span>

// //             <h2>
// //               Asset Health Details
// //             </h2>

// //           </div>

// //         </div>

// //         <div className="dashboard-table-wrapper">

// //           <table className="health-table">

// //             <thead>

// //               <tr>
// //                 <th>Asset Tag</th>
// //                 <th>Asset Name</th>
// //                 <th>Category</th>
// //                 <th>Status</th>
// //                 <th>Health Score</th>
// //                 <th>Condition</th>
// //               </tr>

// //             </thead>

// //             <tbody>

// //               {loading ? (

// //                 <tr>

// //                   <td
// //                     colSpan="6"
// //                     className="table-loading"
// //                   >
// //                     Loading health data...
// //                   </td>

// //                 </tr>

// //               ) : assets.length === 0 ? (

// //                 <tr>

// //                   <td
// //                     colSpan="6"
// //                     className="table-loading"
// //                   >
// //                     No health data available.
// //                   </td>

// //                 </tr>

// //               ) : (

// //                 assets.map(
// //                   (asset) => {

// //                     const healthClass =
// //                       asset.health < 40
// //                         ? "critical"
// //                         : asset.health < 70
// //                         ? "warning"
// //                         : "healthy";

// //                     return (
// //                       <tr
// //                         key={asset.id}
// //                       >

// //                         <td>
// //                           <strong>
// //                             {asset.tag}
// //                           </strong>
// //                         </td>

// //                         <td>
// //                           {asset.name}
// //                         </td>

// //                         <td>
// //                           {asset.category}
// //                         </td>

// //                         <td>
// //                           {asset.status}
// //                         </td>

// //                         <td>
// //                           <strong>
// //                             {asset.health}%
// //                           </strong>
// //                         </td>

// //                         <td>

// //                           <div className="health-condition">

// //                             <span
// //                               className={`condition-dot ${healthClass}`}
// //                             ></span>

// //                             <span>
// //                               {healthClass ===
// //                               "healthy"
// //                                 ? "Healthy"
// //                                 : healthClass ===
// //                                   "warning"
// //                                 ? "Needs Attention"
// //                                 : "Critical"}
// //                             </span>

// //                           </div>

// //                         </td>

// //                       </tr>
// //                     );
// //                   }
// //                 )

// //               )}

// //             </tbody>

// //           </table>

// //         </div>

// //       </section>

// //     </div>
// //   );
// // };

// // export default HealthMonitor;
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import axios from "axios";

const API =
  "http://localhost:8080/api";


const HealthMonitor = () => {

  const [assets, setAssets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const loadHealth =
    useCallback(async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          ) ||
          localStorage.getItem(
            "authToken"
          );

        const config =
          token
            ? {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            : {};

        const response =
          await axios.get(
            `${API}/assets`,
            config
          );

        const data =
          Array.isArray(
            response.data
          )
            ? response.data
            : Array.isArray(
                response.data?.content
              )
            ? response.data.content
            : [];

        setAssets(data);

      } catch (error) {

        console.error(
          "Health monitor error:",
          error
        );

      } finally {

        setLoading(false);

      }

    }, []);


  useEffect(() => {

    loadHealth();

    const timer =
      setInterval(
        loadHealth,
        10000
      );

    return () =>
      clearInterval(timer);

  }, [loadHealth]);


  const getHealth =
    (asset) => {

      const value =
        asset.currentHealth ??
        asset.health ??
        asset.healthScore ??
        asset.healthPercentage ??
        asset.health_percentage;

      if (
        value === null ||
        value === undefined ||
        value === ""
      ) {
        return null;
      }

      const number =
        Number(value);

      return Number.isFinite(number)
        ? Math.max(
            0,
            Math.min(100, number)
          )
        : null;
    };


  const getCondition =
    (health) => {

      if (health === null) {
        return "Metric unavailable";
      }

      if (health >= 70) {
        return "Healthy";
      }

      if (health >= 40) {
        return "Warning";
      }

      return "Critical";
    };


  const getLevel =
    (health) => {

      if (health === null) {
        return "—";
      }

      if (health >= 90) {
        return "EXCELLENT";
      }

      if (health >= 70) {
        return "GOOD";
      }

      if (health >= 40) {
        return "MODERATE";
      }

      return "CRITICAL";
    };


  const averageHealth =
    useMemo(() => {

      const values =
        assets
          .map(getHealth)
          .filter(
            (v) => v !== null
          );

      if (!values.length) {
        return null;
      }

      return Math.round(
        values.reduce(
          (a, b) => a + b,
          0
        ) / values.length
      );

    }, [assets]);


  return (

    <div className="page-container health-page">

      <div className="health-hero">

        <div>

          <span className="eyebrow">
            CONDITION MONITORING
          </span>

          <h1>
            Industrial Asset Health
          </h1>

          <p>
            Real-time equipment condition
            and health intelligence.
          </p>

        </div>

        <div className="health-live">
          ● LIVE MONITORING
        </div>

      </div>


      <div className="health-summary">

        <div className="health-summary-card">

          <span>
            Fleet Average
          </span>

          <strong>

            {averageHealth === null
              ? "No metrics"
              : `${averageHealth}%`}

          </strong>

        </div>


        <div className="health-summary-card">

          <span>
            Monitored Assets
          </span>

          <strong>
            {
              assets.filter(
                (asset) =>
                  getHealth(asset) !==
                  null
              ).length
            }
          </strong>

        </div>


        <div className="health-summary-card">

          <span>
            Total Assets
          </span>

          <strong>
            {assets.length}
          </strong>

        </div>

      </div>


      <section className="health-table-card">

        <div className="card-heading">

          <div>

            <span className="eyebrow">
              ASSET HEALTH DETAILS
            </span>

            <h2>
              Current Equipment Condition
            </h2>

          </div>

          <span>
            Auto refresh: 10s
          </span>

        </div>


        <div className="health-table-wrapper">

          <table className="health-table">

            <thead>

              <tr>
                <th>Asset Tag</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Health Score</th>
                <th>Condition</th>
                <th>Health Level</th>
              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="7">
                    Loading health data...
                  </td>
                </tr>

              ) : assets.length === 0 ? (

                <tr>
                  <td colSpan="7">
                    No assets available.
                  </td>
                </tr>

              ) : (

                assets.map(
                  (asset, index) => {

                    const health =
                      getHealth(asset);

                    const condition =
                      getCondition(
                        health
                      );

                    const level =
                      getLevel(
                        health
                      );

                    const tag =
                      asset.assetTag ??
                      asset.asset_tag ??
                      "-";

                    const name =
                      asset.name ??
                      "-";

                    const category =
                      asset.category ??
                      "-";

                    const status =
                      asset.currentStatus ??
                      asset.status ??
                      "-";


                    return (

                      <tr
                        key={
                          asset.id ??
                          asset.assetId ??
                          index
                        }
                      >

                        <td>
                          <strong>
                            {tag}
                          </strong>
                        </td>

                        <td>
                          {name}
                        </td>

                        <td>
                          {category}
                        </td>

                        <td>
                          <span className="status-pill">
                            {status}
                          </span>
                        </td>

                        <td>

                          {health !== null ? (

                            <div className="health-value">

                              <strong>
                                {health}%
                              </strong>

                              <div className="health-progress">

                                <div
                                  style={{
                                    width:
                                      `${health}%`
                                  }}
                                />

                              </div>

                            </div>

                          ) : (

                            <span className="metric-unavailable">
                              Metric unavailable
                            </span>

                          )}

                        </td>


                        <td>

                          <span
                            className={
                              `condition condition-${condition
                                .toLowerCase()
                                .replace(
                                  /\s/g,
                                  "-"
                                )}`
                            }
                          >
                            {condition}
                          </span>

                        </td>


                        <td>

                          <strong>
                            {level}
                          </strong>

                        </td>

                      </tr>

                    );

                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
};


export default HealthMonitor;