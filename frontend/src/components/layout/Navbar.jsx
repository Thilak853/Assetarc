

// // import React from "react";

// // import {
// //   Link,
// //   useNavigate,
// // } from "react-router-dom";

// // import {
// //   useDispatch,
// //   useSelector,
// // } from "react-redux";

// // import {
// //   logout,
// // } from "../../store/slices/authSlice";

// // const Navbar = () => {
// //   const dispatch =
// //     useDispatch();

// //   const navigate =
// //     useNavigate();

// //   const auth =
// //     useSelector(
// //       (state) =>
// //         state?.auth || {}
// //     );

// //   const authenticated =
// //     auth.isAuthenticated ===
// //       true ||
// //     auth.authenticated ===
// //       true;

// //   if (!authenticated) {
// //     return null;
// //   }

// //   const user =
// //     auth.user || {};

// //   const username =
// //     user.username ||
// //     auth.username ||
// //     "User";

// //   const role =
// //     user.role ||
// //     auth.role ||
// //     "USER";

// //   const handleLogout =
// //     () => {
// //       dispatch(
// //         logout()
// //       );

// //       navigate("/");
// //     };

// //   return (
// //     <nav
// //       className="navbar"
// //       role="navigation"
// //     >

// //       <Link
// //         to="/dashboard"
// //         className="navbar-brand"
// //       >
// //         <div className="navbar-logo">
// //           A
// //         </div>

// //         <div className="navbar-brand-text">

// //           <strong>
// //             AssetArc
// //           </strong>

// //           <span>
// //             Lifecycle Monitor
// //           </span>

// //         </div>
// //       </Link>

// //       <div className="navbar-links">

// //         <Link to="/dashboard">
// //           Dashboard
// //         </Link>

// //         <Link to="/assets">
// //           Assets
// //         </Link>

// //         <Link to="/maintenance">
// //           Maintenance
// //         </Link>

// //         <Link to="/health">
// //           Health Monitor
// //         </Link>

// //         <Link to="/reports">
// //           Reports
// //         </Link>

        

// //       </div>

// //       <div className="navbar-user-area">

// //         <div className="user-profile">

// //           <div className="user-avatar">
// //             {username
// //               .charAt(0)
// //               .toUpperCase()}
// //           </div>

// //           <div className="user-info">

// //             <div className="navbar-user">
// //               Welcome, {username}
// //             </div>

// //             <span className="role-badge">
// //               {role}
// //             </span>

// //           </div>

// //         </div>

// //         <button
// //           type="button"
// //           className="nav-action-btn logout-btn"
// //           onClick={
// //             handleLogout
// //           }
// //         >
// //           Logout
// //         </button>

// //       </div>

// //     </nav>
// //   );
// // };

// // export default Navbar;
// import React from "react";
// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   Link,
//   useNavigate,
// } from "react-router-dom";

// import {
//   logout,
// } from "../../store/slices/authSlice";

// import {
//   normalizeRole,
//   canAccessDashboard,
//   canAccessAssets,
//   canAccessMaintenance,
//   canAccessHealth,
//   canAccessReports,
//   canAccessAdmin,
// } from "../../utils/roleAccess";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const auth = useSelector(
//     (state) => state.auth || {}
//   );

//   const isAuthenticated =
//     auth.isAuthenticated === true ||
//     auth.authenticated === true;

//   if (!isAuthenticated) {
//     return null;
//   }

//   const user = auth.user || {};

//   const username =
//     user.username ||
//     user.name ||
//     auth.username ||
//     "User";

//   const role = normalizeRole(
//     user.role ||
//     auth.role ||
//     "USER"
//   );

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   return (
//     <nav
//       className="navbar"
//       role="navigation"
//     >

//       {/* BRAND */}

//       <Link
//         to="/dashboard"
//         className="navbar-brand"
//       >

//         <div className="navbar-logo">
//           A
//         </div>

//         <div className="navbar-brand-text">

//           <strong>
//             AssetArc
//           </strong>

//           <span>
//             Lifecycle Monitor
//           </span>

//         </div>

//       </Link>

//       {/* LINKS */}

//       <div className="navbar-links">

//         {canAccessDashboard(role) && (
//           <Link to="/dashboard">
//             Dashboard
//           </Link>
//         )}

//         {canAccessAssets(role) && (
//           <Link to="/assets">
//             Assets
//           </Link>
//         )}

//         {canAccessMaintenance(role) && (
//           <Link to="/maintenance">
//             Maintenance
//           </Link>
//         )}

//         {canAccessHealth(role) && (
//           <Link to="/health">
//             Health Monitor
//           </Link>
//         )}

//         {canAccessReports(role) && (
//           <Link to="/reports">
//             Reports
//           </Link>
//         )}

//         {canAccessAdmin(role) && (
//           <Link to="/admin">
//             Admin Access
//           </Link>
//         )}

//       </div>

//       {/* USER */}

//       <div className="navbar-user-area">

//         <div className="user-profile">

//           <div className="user-avatar">
//             {username
//               .charAt(0)
//               .toUpperCase()}
//           </div>

//           <div className="user-info">

//             <div className="navbar-user">
//               Welcome, {username}
//             </div>

//             <span className="role-badge">
//               {role}
//             </span>

//           </div>

//         </div>

//         <button
//           type="button"
//           className="nav-action-btn logout-btn"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>

//       </div>

//     </nav>
//   );
// };

// export default Navbar;
// src/components/layout/Navbar.jsx

import React from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  logout,
} from "../../store/slices/authSlice";

import {
  normalizeRole,
  canAccessAdmin,
} from "../../utils/rolePermissions";


const Navbar = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();


  const auth =
    useSelector(
      (state) => state.auth || {}
    );


  const isAuthenticated =
    auth.isAuthenticated === true ||
    auth.authenticated === true;


  if (!isAuthenticated) {
    return null;
  }


  const user =
    auth.user || {};


  const username =
    user.username ||
    user.name ||
    auth.username ||
    localStorage.getItem(
      "username"
    ) ||
    "User";


  const rawRole =
    user.role ||
    auth.role ||
    localStorage.getItem(
      "role"
    ) ||
    "";


  const role =
    normalizeRole(
      rawRole
    );


  const roleLabel =
    role === "SYSTEM_ADMIN"
      ? "SYSTEM ADMIN"
      : role === "ASSET_MANAGER"
      ? "ASSET MANAGER"
      : role === "MAINTENANCE_TECHNICIAN"
      ? "MAINTENANCE TECHNICIAN"
      : role === "OPERATIONS_SUPERVISOR"
      ? "OPERATIONS SUPERVISOR"
      : role;


  const handleLogout =
    () => {

      dispatch(
        logout()
      );

      navigate("/");
    };


  return (

    <nav
      className="navbar"
      role="navigation"
    >

      {/* BRAND */}

      <Link
        to="/dashboard"
        className="navbar-brand"
      >

        <div className="navbar-logo">
          A
        </div>

        <div className="navbar-brand-text">

          <strong>
            AssetArc
          </strong>

          <span>
            Lifecycle Monitor
          </span>

        </div>

      </Link>


      {/* ALL ROLES */}

      <div className="navbar-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/assets">
          Assets
        </Link>

        <Link to="/maintenance">
          Maintenance
        </Link>

        <Link to="/health">
          Health Monitor
        </Link>

        <Link to="/reports">
          Reports
        </Link>


        {/* ADMIN ONLY */}

        {canAccessAdmin(role) && (

          <Link
            to="/admin"
            className="admin-nav-link"
          >
            Admin Access
          </Link>

        )}

      </div>


      {/* USER */}

      <div className="navbar-user-area">

        <div className="user-profile">

          <div className="user-avatar">
            {username
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="user-info">

            <div className="navbar-user">
              Welcome, {username}
            </div>

            <span className="role-badge">
              {roleLabel}
            </span>

          </div>

        </div>


        <button
          type="button"
          className="nav-action-btn logout-btn"
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

      </div>

    </nav>
  );
};


export default Navbar;