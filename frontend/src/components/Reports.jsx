

// // import React, {
// //   useEffect,
// //   useState,
// // } from "react";

// // import axios from "axios";

// // const API =
// //   "http://localhost:8080/api";

// // const Reports = () => {
// //   const [assets, setAssets] =
// //     useState([]);

// //   const [maintenance, setMaintenance] =
// //     useState([]);

// //   const [loading, setLoading] =
// //     useState(true);

// //   const [message, setMessage] =
// //     useState("");

// //   const getConfig = () => {
// //     const token =
// //       localStorage.getItem(
// //         "token"
// //       ) ||
// //       localStorage.getItem(
// //         "authToken"
// //       );

// //     return token
// //       ? {
// //           headers: {
// //             Authorization:
// //               `Bearer ${token}`,
// //           },
// //         }
// //       : {};
// //   };

// //   const loadReports =
// //     async () => {
// //       setLoading(
// //         true
// //       );

// //       try {
// //         const assetsResponse =
// //           await axios.get(
// //             `${API}/assets`,
// //             getConfig()
// //           );

// //         const data =
// //           assetsResponse?.data ||
// //           {};

// //         const assetList =
// //           Array.isArray(data)
// //             ? data
// //             : data.content || [];

// //         setAssets(
// //           assetList
// //         );

// //         try {
// //           const scheduleResponse =
// //             await axios.get(
// //               `${API}/maintenance/schedules`,
// //               getConfig()
// //             );

// //           const schedules =
// //             scheduleResponse?.data ||
// //             [];

// //           setMaintenance(
// //             Array.isArray(
// //               schedules
// //             )
// //               ? schedules
// //               : []
// //           );
// //         } catch {
// //           setMaintenance(
// //             []
// //           );
// //         }
// //       } catch (err) {
// //         console.error(
// //           "Report loading error:",
// //           err
// //         );
// //       } finally {
// //         setLoading(
// //           false
// //         );
// //       }
// //     };

// //   useEffect(() => {
// //     loadReports();
// //   }, []);

// //   const exportReport =
// //     () => {
// //       const header = [
// //         "Asset Tag",
// //         "Name",
// //         "Category",
// //         "Status",
// //         "Health",
// //         "Purchase Price",
// //         "Install Date",
// //       ];

// //       const rows =
// //         assets.map(
// //           (asset) => [
// //             asset.assetTag ||
// //               "",
// //             asset.name ||
// //               "",
// //             asset.category ||
// //               "",
// //             asset.currentStatus ||
// //               asset.status ||
// //               "",
// //             asset.currentHealth ??
// //               asset.health ??
// //               "",
// //             asset.purchasePrice ??
// //               "",
// //             asset.installDate ||
// //               "",
// //           ]
// //         );

// //       const csv = [
// //         header,
// //         ...rows,
// //       ]
// //         .map(
// //           (row) =>
// //             row
// //               .map(
// //                 (value) =>
// //                   `"${String(
// //                     value ??
// //                       ""
// //                   ).replace(
// //                     /"/g,
// //                     '""'
// //                   )}"`
// //               )
// //               .join(",")
// //         )
// //         .join("\n");

// //       const blob =
// //         new Blob(
// //           [csv],
// //           {
// //             type:
// //               "text/csv;charset=utf-8;",
// //           }
// //         );

// //       const url =
// //         URL.createObjectURL(
// //           blob
// //         );

// //       const link =
// //         document.createElement(
// //           "a"
// //         );

// //       link.href = url;

// //       link.download =
// //         `AssetArc_Report_${new Date()
// //           .toISOString()
// //           .slice(0, 10)}.csv`;

// //       document.body.appendChild(
// //         link
// //       );

// //       link.click();

// //       document.body.removeChild(
// //         link
// //       );

// //       URL.revokeObjectURL(
// //         url
// //       );

// //       setMessage(
// //         "Report exported successfully."
// //       );

// //       setTimeout(() => {
// //         setMessage("");
// //       }, 3000);
// //     };

// //   const totalValue =
// //     assets.reduce(
// //       (
// //         total,
// //         asset
// //       ) =>
// //         total +
// //         Number(
// //           asset.purchasePrice ||
// //             0
// //         ),
// //       0
// //     );

// //   const active =
// //     assets.filter(
// //       (asset) =>
// //         (
// //           asset.currentStatus ||
// //           asset.status
// //         ) ===
// //         "ACTIVE"
// //     ).length;

// //   return (
// //     <div className="page-container reports-page">

// //       <div className="page-header">

// //         <div>
// //           <p className="eyebrow">
// //             REPORTING
// //           </p>

// //           <h1>
// //             Reports
// //           </h1>

// //           <p className="page-subtitle">
// //             Review and export lifecycle
// //             information for your asset fleet.
// //           </p>
// //         </div>

// //         <button
// //           type="button"
// //           className="add-btn"
// //           onClick={
// //             exportReport
// //           }
// //           disabled={
// //             loading
// //           }
// //         >
// //           Export Report
// //         </button>

// //       </div>

// //       {message && (
// //         <div className="success-message">
// //           {message}
// //         </div>
// //       )}

// //       <div className="report-summary-grid">

// //         <div className="stat-card">
// //           <span>
// //             Total Assets
// //           </span>

// //           <strong>
// //             {assets.length}
// //           </strong>
// //         </div>

// //         <div className="stat-card">
// //           <span>
// //             Active Assets
// //           </span>

// //           <strong>
// //             {active}
// //           </strong>
// //         </div>

// //         <div className="stat-card">
// //           <span>
// //             Maintenance Schedules
// //           </span>

// //           <strong>
// //             {maintenance.length}
// //           </strong>
// //         </div>

// //         <div className="stat-card">
// //           <span>
// //             Fleet Value
// //           </span>

// //           <strong>
// //             ₹
// //             {totalValue.toLocaleString(
// //               "en-IN"
// //             )}
// //           </strong>
// //         </div>

// //       </div>

// //       <div className="table-wrapper">

// //         <table className="asset-table">

// //           <thead>
// //             <tr>
// //               <th>
// //                 Asset Tag
// //               </th>

// //               <th>
// //                 Name
// //               </th>

// //               <th>
// //                 Category
// //               </th>

// //               <th>
// //                 Status
// //               </th>

// //               <th>
// //                 Health
// //               </th>
// //             </tr>
// //           </thead>

// //           <tbody>

// //             {assets.map(
// //               (
// //                 asset,
// //                 index
// //               ) => (
// //                 <tr
// //                   key={
// //                     asset.id ||
// //                     index
// //                   }
// //                 >
// //                   <td>
// //                     {asset.assetTag ||
// //                       "-"}
// //                   </td>

// //                   <td>
// //                     {asset.name ||
// //                       "-"}
// //                   </td>

// //                   <td>
// //                     {asset.category ||
// //                       "-"}
// //                   </td>

// //                   <td>
// //                     {asset.currentStatus ||
// //                       asset.status ||
// //                       "-"}
// //                   </td>

// //                   <td>
// //                     {asset.currentHealth ??
// //                       asset.health ??
// //                       "-"}
// //                     %
// //                   </td>
// //                 </tr>
// //               )
// //             )}

// //             {!loading &&
// //               assets.length ===
// //                 0 && (
// //                 <tr>
// //                   <td
// //                     colSpan="5"
// //                     className="table-empty"
// //                   >
// //                     No report data available.
// //                   </td>
// //                 </tr>
// //               )}

// //           </tbody>

// //         </table>

// //       </div>

// //     </div>
// //   );
// // };

// // export default Reports;
// import React from "react";

// import {
//   useSelector,
// } from "react-redux";

// import {
//   normalizeRole,
//   canExportReport,
// } from "../utils/roleAccess";

// const Reports = () => {

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

//   const handleExportReport =
//     () => {

//       const report = [
//         "AssetArc Industrial Asset Report",
//         "================================",
//         "",
//         "Generated Report",
//         "",
//         "Asset Tag,Asset Name,Category,Status,Health",
//         "CNC-001,CNC Milling Machine,CNC Equipment,Operational,94%",
//         "HYD-002,Hydraulic Press,Production,Warning,72%",
//         "ROB-003,Industrial Robotic Arm,Automation,Operational,89%",
//         "COM-004,Air Compressor,Utilities,Critical,31%",
//       ].join("\n");

//       const blob =
//         new Blob(
//           [report],
//           {
//             type:
//               "text/csv;charset=utf-8;",
//           }
//         );

//       const url =
//         window.URL.createObjectURL(
//           blob
//         );

//       const link =
//         document.createElement(
//           "a"
//         );

//       link.href = url;

//       link.download =
//         "AssetArc_Report.csv";

//       document.body.appendChild(
//         link
//       );

//       link.click();

//       document.body.removeChild(
//         link
//       );

//       window.URL.revokeObjectURL(
//         url
//       );
//     };

//   return (

//     <div className="page-container reports-page">

//       <div className="page-header">

//         <div>

//           <p className="eyebrow">
//             REPORTING
//           </p>

//           <h1>
//             Reports
//           </h1>

//           <p className="page-subtitle">
//             Asset lifecycle and maintenance
//             reporting.
//           </p>

//         </div>

//         {canExportReport(role) && (

//           <button
//             type="button"
//             className="export-btn"
//             onClick={
//               handleExportReport
//             }
//           >
//             Export Report
//           </button>

//         )}

//       </div>

//       <div className="dashboard-card">

//         <h2>
//           Asset Performance Report
//         </h2>

//         <div className="report-table-wrapper">

//           <table className="dashboard-table">

//             <thead>

//               <tr>

//                 <th>
//                   Asset
//                 </th>

//                 <th>
//                   Category
//                 </th>

//                 <th>
//                   Status
//                 </th>

//                 <th>
//                   Health
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               <tr>
//                 <td>
//                   CNC-001
//                 </td>

//                 <td>
//                   CNC Equipment
//                 </td>

//                 <td>
//                   Operational
//                 </td>

//                 <td>
//                   94%
//                 </td>
//               </tr>

//               <tr>
//                 <td>
//                   HYD-002
//                 </td>

//                 <td>
//                   Production
//                 </td>

//                 <td>
//                   Warning
//                 </td>

//                 <td>
//                   72%
//                 </td>
//               </tr>

//               <tr>
//                 <td>
//                   ROB-003
//                 </td>

//                 <td>
//                   Automation
//                 </td>

//                 <td>
//                   Operational
//                 </td>

//                 <td>
//                   89%
//                 </td>
//               </tr>

//               <tr>
//                 <td>
//                   COM-004
//                 </td>

//                 <td>
//                   Utilities
//                 </td>

//                 <td>
//                   Critical
//                 </td>

//                 <td>
//                   31%
//                 </td>
//               </tr>

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Reports;
import React, {
  useCallback,
  useEffect,
  useState
} from "react";

import axios from "axios";

const API =
  "http://localhost:8080/api";


const Reports = () => {

  const [assets, setAssets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const loadAssets =
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
          "Report loading failed:",
          error
        );

      } finally {

        setLoading(false);

      }

    }, []);


  useEffect(() => {

    loadAssets();

    const timer =
      setInterval(
        loadAssets,
        10000
      );

    return () =>
      clearInterval(timer);

  }, [loadAssets]);


  const getHealth =
    (asset) => {

      const value =
        asset.currentHealth ??
        asset.health ??
        asset.healthScore ??
        asset.healthPercentage ??
        asset.health_percentage;

      const number =
        Number(value);

      return Number.isFinite(number)
        ? number
        : null;
    };


  const exportReport =
    () => {

      const rows =
        assets.map(
          (asset) => {

            const tag =
              asset.assetTag ??
              asset.asset_tag ??
              "";

            const name =
              asset.name ??
              "";

            const category =
              asset.category ??
              "";

            const status =
              asset.currentStatus ??
              asset.status ??
              "";

            const health =
              getHealth(asset);

            return [
              tag,
              name,
              category,
              status,
              health === null
                ? ""
                : health
            ];
          }
        );


      const header = [
        "Asset Tag",
        "Asset Name",
        "Category",
        "Status",
        "Health"
      ];


      const csv = [
        header,
        ...rows
      ]
        .map(
          (row) =>
            row
              .map(
                (value) =>
                  `"${String(
                    value
                  ).replace(
                    /"/g,
                    '""'
                  )}"`
              )
              .join(",")
        )
        .join("\n");


      const blob =
        new Blob(
          [csv],
          {
            type:
              "text/csv;charset=utf-8;"
          }
        );


      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        `AssetArc_Report_${new Date()
          .toISOString()
          .slice(0, 10)}.csv`;

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      URL.revokeObjectURL(
        url
      );
    };


  return (

    <div className="page-container reports-page">

      <div className="reports-hero">

        <div>

          <span className="eyebrow">
            ASSETARC ANALYTICS
          </span>

          <h1>
            Reports
          </h1>

          <p>
            Live asset lifecycle and
            equipment performance reporting.
          </p>

        </div>


        <button
          type="button"
          className="add-btn"
          onClick={
            exportReport
          }
          disabled={
            assets.length === 0
          }
        >
          ↓ Export Live Report
        </button>

      </div>


      <section className="report-card">

        <div className="card-heading">

          <div>

            <span className="eyebrow">
              LIVE REPORT
            </span>

            <h2>
              Asset Performance Report
            </h2>

          </div>

          <span>
            {assets.length} assets
          </span>

        </div>


        <div className="report-table-wrapper">

          <table className="report-table">

            <thead>

              <tr>
                <th>Asset</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Health</th>
              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="5">
                    Loading real asset data...
                  </td>
                </tr>

              ) : assets.length === 0 ? (

                <tr>
                  <td colSpan="5">
                    No assets available.
                  </td>
                </tr>

              ) : (

                assets.map(
                  (asset, index) => {

                    const health =
                      getHealth(asset);

                    return (

                      <tr
                        key={
                          asset.id ??
                          asset.assetId ??
                          index
                        }
                      >

                        <td>
                          {
                            asset.assetTag ??
                            asset.asset_tag ??
                            "-"
                          }
                        </td>

                        <td>
                          {asset.name ?? "-"}
                        </td>

                        <td>
                          {asset.category ?? "-"}
                        </td>

                        <td>
                          {
                            asset.currentStatus ??
                            asset.status ??
                            "-"
                          }
                        </td>

                        <td>
                          {health === null
                            ? "No metric"
                            : `${health}%`}
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


export default Reports;