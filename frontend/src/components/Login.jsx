

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../store/slices/authSlice";

const API_BASE_URL = "http://localhost:8080/api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth || {});

  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("TECH");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const roleMapping = {
    TECH: "MAINTENANCE_TECHNICIAN",
    MANAGER: "ASSET_MANAGER",
    SUPERVISOR: "OPERATIONS_SUPERVISOR",
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const result = await dispatch(
        login({
          username: username.trim(),
          password,
        })
      );

      if (login.fulfilled.match(result)) {
        setMessage("Login successful.");

        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        setError(
          result.payload ||
            "Invalid Credentials. Please try again."
        );
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    if (password.length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    try {
      setLoading(true);

      const backendRole = roleMapping[role];

      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        {
          username: username.trim(),
          email: email.trim(),
          password,
          role: backendRole,
        }
      );

      const data = response.data || {};

      const token =
        data.token ||
        data.accessToken ||
        data.jwt ||
        "";

      const registeredUsername =
        data.username ||
        username.trim();

      const registeredRole =
        data.role ||
        backendRole;

      /*
       * Store authentication information.
       */
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("authToken", token);
      }

      localStorage.setItem(
        "username",
        registeredUsername
      );

      localStorage.setItem(
        "role",
        registeredRole
      );

      /*
       * Update Redux authentication state.
       *
       * This uses the same fulfilled action format
       * expected by the existing authSlice.
       */
      dispatch({
        type: "auth/login/fulfilled",
        payload: {
          token,
          username: registeredUsername,
          role: registeredRole,
        },
      });

      setMessage(
        "Account created successfully. Logging you in..."
      );

      /*
       * Automatically enter dashboard.
       */
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message;

      const backendError =
        err?.response?.data?.error;

      setError(
        backendMessage ||
          backendError ||
          err?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);

    setUsername("");
    setEmail("");
    setPassword("");
    setRole("TECH");

    setMessage("");
    setError("");
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-info">

        <div className="login-info-content">

          <div className="system-label">
            ASSETARC INDUSTRIAL SYSTEM
          </div>

          <h1>
            Smart Industrial
            <br />
            Asset Management
          </h1>

          <p>
            Manage, monitor and maintain your
            industrial assets with intelligent
            lifecycle monitoring and predictive
            maintenance operations.
          </p>

          <div className="login-features">

            <div className="login-feature">
              <div className="feature-icon">
                ◉
              </div>

              <div>
                <strong>24/7 Asset Monitoring</strong>
                <span>
                  Continuous industrial asset tracking
                </span>
              </div>
            </div>

            <div className="login-feature">
              <div className="feature-icon">
                ✓
              </div>

              <div>
                <strong>99.9% System Visibility</strong>
                <span>
                  Real-time asset lifecycle visibility
                </span>
              </div>
            </div>

            <div className="login-feature">
              <div className="feature-icon">
                ◈
              </div>

              <div>
                <strong>AI Predictive Insights</strong>
                <span>
                  Intelligent maintenance monitoring
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-form-section">

        <div className="login-card">

          {/* LOGO */}
          <div className="assetarc-logo">

            <div className="assetarc-logo-icon">
              A
            </div>

            <div className="assetarc-logo-text">
              <strong>AssetArc</strong>
              <span>Lifecycle Monitor</span>
            </div>

          </div>

          {/* LOGIN */}
          {!isRegister && (
            <>
              <div className="form-heading">

                <span className="form-label">
                  USER LOGIN
                </span>

                <h2>
                  Welcome Back
                </h2>

                <p>
                  Sign in to access your AssetArc
                  industrial asset dashboard.
                </p>

              </div>

              <form onSubmit={handleLogin}>

                <div className="form-group">

                  <label htmlFor="username">
                    Username
                  </label>

                  <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    autoComplete="username"
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="password">
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                  />

                </div>

                {error && (
                  <div className="form-error">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="form-success">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="login-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In"}
                </button>

              </form>

              <div className="register-switch">

                <span>
                  Don't have an account?
                </span>

                <button
                  type="button"
                  onClick={switchMode}
                  className="register-link"
                >
                  Create Account
                </button>

              </div>
            </>
          )}

          {/* REGISTER */}
          {isRegister && (
            <>
              <div className="form-heading">

                <span className="form-label">
                  USER REGISTRATION
                </span>

                <h2>
                  Create Account
                </h2>

                <p>
                  Create your AssetArc account and
                  start managing industrial assets.
                </p>

              </div>

              <form onSubmit={handleRegister}>

                <div className="form-group">

                  <label htmlFor="register-username">
                    Username
                  </label>

                  <input
                    id="register-username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    autoComplete="username"
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="register-email">
                    Email
                  </label>

                  <input
                    id="register-email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="register-password">
                    Password
                  </label>

                  <input
                    id="register-password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="new-password"
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="register-role">
                    Select Role
                  </label>

                  <select
                    id="register-role"
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                  >
                    <option value="TECH">
                      Maintenance Technician
                    </option>

                    <option value="MANAGER">
                      Asset Manager
                    </option>

                    <option value="SUPERVISOR">
                      Operations Supervisor
                    </option>
                  </select>

                </div>

                <div className="role-description">

                  {role === "TECH" && (
                    <span>
                      Maintenance Technician can schedule
                      and complete maintenance tasks.
                    </span>
                  )}

                  {role === "MANAGER" && (
                    <span>
                      Asset Manager can manage assets,
                      schedules and maintenance operations.
                    </span>
                  )}

                  {role === "SUPERVISOR" && (
                    <span>
                      Operations Supervisor can monitor
                      assets and maintenance schedules.
                    </span>
                  )}

                </div>

                {error && (
                  <div className="form-error">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="form-success">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="login-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}
                </button>

              </form>

              <div className="register-switch">

                <span>
                  Already have an account?
                </span>

                <button
                  type="button"
                  onClick={switchMode}
                  className="register-link"
                >
                  Back to Login
                </button>

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default Login;