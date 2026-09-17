

import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import AssetList from "./components/asset/AssetList";

import MaintenanceScheduler from "./components/maintenance/MaintenanceScheduler";

import HealthMonitor from "./components/HealthMonitor";
import Reports from "./components/Reports";

/*
 * ============================================================
 * AUTH HELPERS
 * ============================================================
 */

const getAuthData = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    "";

  const username =
    localStorage.getItem("username") || "";

  const role =
    localStorage.getItem("role") || "";

  return {
    token,
    username,
    role: String(role).toUpperCase(),
  };
};

/*
 * ============================================================
 * PROTECTED ROUTE
 * ============================================================
 */

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const auth = getAuthData();

  /*
   * Authentication is valid when either:
   * - token exists
   * - Redux/localStorage has authentication information
   */
  if (!auth.token) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return children;
};

/*
 * ============================================================
 * ROLE HELPER
 * ============================================================
 */

const normalizeRole = (role) => {
  return String(role || "").toUpperCase();
};

const isAdminRole = (role) => {
  const normalized = normalizeRole(role);

  return (
    normalized === "SYSTEM_ADMIN" ||
    normalized === "ADMIN" ||
    normalized === "ADMINISTRATOR" ||
    normalized === "SUPER_ADMIN"
  );
};

/*
 * ============================================================
 * ADMIN PAGE
 * ============================================================
 *
 * Kept inside App.jsx so you do not need another Admin.jsx file.
 */

const AdminPage = () => {
  const auth = getAuthData();

  if (!isAdminRole(auth.role)) {
    return (
      <div className="page-container">
        <div className="access-denied">
          <div className="access-denied-icon">
            !
          </div>

          <h1>Access Denied</h1>

          <p>
            You do not have permission to access
            the administration panel.
          </p>

          <button
            type="button"
            className="add-btn"
            onClick={() =>
              window.location.href = "/dashboard"
            }
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <span className="section-label">
            SYSTEM ADMINISTRATION
          </span>

          <h1>Admin Access</h1>

          <p>
            Manage AssetArc system administration
            and user access.
          </p>
        </div>
      </div>

      <div className="admin-grid">

        <div className="admin-card">
          <div className="admin-card-icon">
            👤
          </div>

          <h2>User Management</h2>

          <p>
            Manage system users, roles and access
            permissions.
          </p>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">
            🔐
          </div>

          <h2>Security</h2>

          <p>
            Monitor authentication and system
            security settings.
          </p>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">
            ⚙
          </div>

          <h2>System Configuration</h2>

          <p>
            Configure AssetArc operational settings.
          </p>
        </div>

      </div>

    </div>
  );
};

/*
 * ============================================================
 * APP
 * ============================================================
 */

const App = () => {
  return (
    <div className="assetarc-app">

      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <main className="app-main">

        <Routes>

          {/* ==================================================
              LOGIN
          ================================================== */}

          <Route
            path="/"
            element={<Login />}
          />

          {/* ==================================================
              DASHBOARD
          ================================================== */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              ASSETS
          ================================================== */}

          <Route
            path="/assets"
            element={
              <ProtectedRoute>
                <AssetList />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              MAINTENANCE
          ================================================== */}

          <Route
            path="/maintenance"
            element={
              <ProtectedRoute>
                <MaintenanceScheduler />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              HEALTH MONITOR
          ================================================== */}

          <Route
            path="/health"
            element={
              <ProtectedRoute>
                <HealthMonitor />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              REPORTS
          ================================================== */}

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              ADMIN
          ================================================== */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              UNKNOWN URL
          ================================================== */}

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

        </Routes>

      </main>

    </div>
  );
};

export default App;