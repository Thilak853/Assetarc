
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

const getStoredAuth = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    "";

  const username = localStorage.getItem("username") || "";
  const role = localStorage.getItem("role") || "";

  return {
    token,
    username,
    role,
  };
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useSelector((state) => state.auth || {});

  const storedAuth = getStoredAuth();

  /*
   * IMPORTANT:
   * Redux can become empty after browser refresh.
   * Therefore localStorage is used as a fallback.
   */
  const token = auth.token || storedAuth.token;

  const username =
    auth.username ||
    auth.user?.username ||
    auth.user?.name ||
    storedAuth.username ||
    "User";

  const role = String(
    auth.role ||
      auth.user?.role ||
      storedAuth.role ||
      ""
  ).toUpperCase();

  const isAuthenticated =
    auth.isAuthenticated === true ||
    auth.authenticated === true ||
    Boolean(token);

  if (!isAuthenticated) {
    return null;
  }

  const isAdmin =
    role === "SYSTEM_ADMIN" ||
    role === "ADMIN" ||
    role === "ADMINISTRATOR" ||
    role === "SUPER_ADMIN";

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    /*
     * Clear Redux authentication state.
     */
    dispatch(logout());

    /*
     * Extra cleanup in case authentication was stored
     * directly in localStorage.
     */
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar" role="navigation">

      {/* BRAND */}
      <Link to="/dashboard" className="navbar-brand">
        <div className="navbar-logo">
          A
        </div>

        <div className="navbar-brand-text">
          <strong>AssetArc</strong>
          <span>Lifecycle Monitor</span>
        </div>
      </Link>

      {/* MAIN NAVIGATION */}
      <div className="navbar-links">

        <Link
          to="/dashboard"
          className={
            isActive("/dashboard")
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span className="nav-icon">⌂</span>
          <span>Dashboard</span>
        </Link>

        <Link
          to="/assets"
          className={
            isActive("/assets")
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span className="nav-icon">▣</span>
          <span>Assets</span>
        </Link>

        <Link
          to="/maintenance"
          className={
            isActive("/maintenance")
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span className="nav-icon">⚙</span>
          <span>Maintenance</span>
        </Link>

        <Link
          to="/health"
          className={
            isActive("/health")
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span className="nav-icon">♥</span>
          <span>Health Monitor</span>
        </Link>

        <Link
          to="/reports"
          className={
            isActive("/reports")
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span className="nav-icon">▤</span>
          <span>Reports</span>
        </Link>

        {/* ADMIN ONLY */}
        {isAdmin && (
          <Link
            to="/admin"
            className={
              isActive("/admin")
                ? "nav-link admin-link active"
                : "nav-link admin-link"
            }
          >
            <span className="nav-icon">♛</span>
            <span>Admin Access</span>
          </Link>
        )}

      </div>

      {/* USER AREA */}
      <div className="navbar-user-area">

        <div className="user-profile">

          <div className="user-avatar">
            {String(username)
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="user-info">

            <div className="navbar-user">
              Welcome, {username}
            </div>

            <span className="role-badge">
              {role || "USER"}
            </span>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          type="button"
          className="nav-action-btn logout-btn"
          onClick={handleLogout}
        >
          <span className="logout-icon">↪</span>
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;