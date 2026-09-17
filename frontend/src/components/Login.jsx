

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, clearAuthError } from "../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth || {});

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const loading = auth.loading === true;
  const error = auth.error;

  useEffect(() => {
    if (
      auth.isAuthenticated === true ||
      auth.authenticated === true
    ) {
      navigate("/dashboard", { replace: true });
    }
  }, [
    auth.isAuthenticated,
    auth.authenticated,
    navigate,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      return;
    }

    try {
      await dispatch(
        login({
          username: username.trim(),
          password,
        })
      ).unwrap();
    } catch (err) {
      // Redux already stores the error.
      // Do not throw it again because that would create
      // an unnecessary console error during testing.
    }
  };

  const handleCreateAccount = () => {
    setShowRegister(true);

    if (typeof clearAuthError === "function") {
      dispatch(clearAuthError());
    }
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
    setUsername("");
    setPassword("");

    if (typeof clearAuthError === "function") {
      dispatch(clearAuthError());
    }
  };

  /*
   * Registration screen
   *
   * This does not affect the existing Login tests because
   * the normal Login screen remains the default screen.
   */
  if (showRegister) {
    return (
      <div className="login-container">
        <div className="login-visual-panel">
          <div className="login-visual-overlay">
            <div className="login-visual-content">
              <span className="eyebrow">
                ASSETARC INDUSTRIAL SYSTEM
              </span>

              <h1>
                Smart Industrial
                <br />
                Asset Management
              </h1>

              <p>
                Register your account to access industrial
                asset lifecycle monitoring and maintenance
                operations.
              </p>

              <div className="login-feature-row">
                <div className="login-feature-card">
                  <strong>24/7</strong>
                  <span>Asset Monitoring</span>
                </div>

                <div className="login-feature-card">
                  <strong>99.9%</strong>
                  <span>System Visibility</span>
                </div>

                <div className="login-feature-card">
                  <strong>AI</strong>
                  <span>Predictive Insights</span>
                </div>
              </div>
            </div>
          </div>

          <div className="login-grid-background"></div>

          <div className="login-3d-shape login-shape-one"></div>
          <div className="login-3d-shape login-shape-two"></div>
          <div className="login-3d-shape login-shape-three"></div>
        </div>

        <div className="login-form-panel">
          <div className="login-card">
            <div className="brand-header">
              <div className="brand-logo">A</div>

              <div>
                <h2>AssetArc</h2>
                <span>Lifecycle Monitor</span>
              </div>
            </div>

            <div className="login-heading">
              <span className="eyebrow">
                USER REGISTRATION
              </span>

              <h2>Create Account</h2>

              <p>
                Create your AssetArc account.
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="form-group">
                <label htmlFor="register-username">
                  Username
                </label>

                <input
                  id="register-username"
                  type="text"
                  placeholder="Enter username"
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
                  autoComplete="new-password"
                />
              </div>

              <button
                type="submit"
                className="login-submit-btn"
              >
                Create Account
              </button>

              <button
                type="button"
                className="register-back-btn"
                onClick={handleBackToLogin}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      {/* LEFT SIDE */}
      <div className="login-visual-panel">
        <div className="login-visual-overlay">
          <div className="login-visual-content">
            <span className="eyebrow">
              ASSETARC INDUSTRIAL SYSTEM
            </span>

            <h1>
              Smart Industrial
              <br />
              Asset Management
            </h1>

            <p>
              Monitor equipment health, manage maintenance,
              track lifecycle status and improve operational
              reliability.
            </p>

            <div className="login-feature-row">
              <div className="login-feature-card">
                <strong>24/7</strong>
                <span>Asset Monitoring</span>
              </div>

              <div className="login-feature-card">
                <strong>99.9%</strong>
                <span>System Visibility</span>
              </div>

              <div className="login-feature-card">
                <strong>AI</strong>
                <span>Predictive Insights</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-grid-background"></div>

        <div className="login-3d-shape login-shape-one"></div>
        <div className="login-3d-shape login-shape-two"></div>
        <div className="login-3d-shape login-shape-three"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-form-panel">
        <div className="login-card">
          <div className="brand-header">
            <div className="brand-logo">A</div>

            <div>
              <h2>AssetArc Login</h2>
              <span>Lifecycle Monitor</span>
            </div>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            {/* USERNAME */}
            <div className="form-group">
              <label htmlFor="login-username">
                Username
              </label>

              <input
                id="login-username"
                type="text"
                value={username}
                placeholder="Enter username"
                autoComplete="username"
                onChange={(event) => {
                  setUsername(event.target.value);

                  if (error) {
                    dispatch(clearAuthError());
                  }
                }}
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                value={password}
                placeholder="Enter password"
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword(event.target.value);

                  if (error) {
                    dispatch(clearAuthError());
                  }
                }}
              />
            </div>

            {/* ERROR */}
            {error && (
              <div
                className="login-error"
                role="alert"
              >
                <div>Invalid Credentials</div>
                <div>Please try again </div>
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={
                loading ||
                !username.trim() ||
                !password.trim()
              }
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* CREATE ACCOUNT */}
            <button
              type="button"
              className="create-account-btn"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;