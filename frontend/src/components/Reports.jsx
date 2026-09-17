


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