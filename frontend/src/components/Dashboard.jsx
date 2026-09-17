



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