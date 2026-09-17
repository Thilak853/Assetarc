
// // // import React from "react";

// // // import {
// // //   Routes,
// // //   Route,
// // //   Navigate,
// // // } from "react-router-dom";

// // // import {
// // //   useSelector,
// // // } from "react-redux";

// // // import Navbar from "./components/layout/Navbar";

// // // import Login from "./components/Login";
// // // import Dashboard from "./components/Dashboard";
// // // import AssetList from "./components/asset/AssetList";
// // // import HealthMonitor from "./components/HealthMonitor";
// // // import Reports from "./components/Reports";
// // // import MaintenanceScheduler from "./components/maintenance/MaintenanceScheduler";

// // // const ProtectedLayout = () => {

// // //   const auth =
// // //     useSelector(
// // //       (state) => state.auth || {}
// // //     );

// // //   const authenticated =
// // //     auth.isAuthenticated === true ||
// // //     auth.authenticated === true;

// // //   if (!authenticated) {
// // //     return (
// // //       <Navigate
// // //         to="/"
// // //         replace
// // //       />
// // //     );
// // //   }

// // //   return (
// // //     <>
// // //       <Navbar />

// // //       <Routes>

// // //         <Route
// // //           path="/dashboard"
// // //           element={
// // //             <Dashboard />
// // //           }
// // //         />

// // //         <Route
// // //           path="/assets"
// // //           element={
// // //             <AssetList />
// // //           }
// // //         />

// // //         <Route
// // //           path="/maintenance"
// // //           element={
// // //             <MaintenanceScheduler />
// // //           }
// // //         />

// // //         <Route
// // //           path="/health"
// // //           element={
// // //             <HealthMonitor />
// // //           }
// // //         />

// // //         <Route
// // //           path="/reports"
// // //           element={
// // //             <Reports />
// // //           }
// // //         />

// // //         <Route
// // //           path="/users/create"
// // //           element={
// // //             <CreateUserPage />
// // //           }
// // //         />

// // //       </Routes>
// // //     </>
// // //   );
// // // };

// // // const CreateUserPage = () => {

// // //   return (
// // //     <main className="page-container">

// // //       <section className="simple-page-card">

// // //         <p className="eyebrow">
// // //           ADMINISTRATION
// // //         </p>

// // //         <h1>
// // //           Create User
// // //         </h1>

// // //         <p>
// // //           Create and assign a role to
// // //           a new AssetArc user.
// // //         </p>

// // //         <div className="role-card-grid">

// // //           <button className="role-card">
// // //             ADMIN
// // //           </button>

// // //           <button className="role-card">
// // //             ASSET MANAGER
// // //           </button>

// // //           <button className="role-card">
// // //             TECHNICIAN
// // //           </button>

// // //         </div>

// // //       </section>

// // //     </main>
// // //   );
// // // };

// // // const App = () => {

// // //   return (
// // //     <Routes>

// // //       <Route
// // //         path="/"
// // //         element={
// // //           <Login />
// // //         }
// // //       />

// // //       <Route
// // //         path="/*"
// // //         element={
// // //           <ProtectedLayout />
// // //         }
// // //       />

// // //     </Routes>
// // //   );
// // // };

// // // export default App;
// import React from "react";

// import {
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import {
//   useSelector,
// } from "react-redux";

// import Navbar from "./components/layout/Navbar";

// import Login from "./components/Login";

// import Dashboard from "./components/Dashboard";

// import AssetList from "./components/asset/AssetList";

// import HealthMonitor from "./components/HealthMonitor";

// import Reports from "./components/Reports";


// import MaintenanceScheduler from "./components/maintenance/MaintenanceScheduler";

// const ProtectedRoute = ({
//   children,
// }) => {
//   const auth =
//     useSelector(
//       (state) =>
//         state?.auth || {}
//     );

//   const authenticated =
//     auth.isAuthenticated ===
//       true ||
//     auth.authenticated ===
//       true;

//   if (!authenticated) {
//     return (
//       <Navigate
//         to="/"
//         replace
//       />
//     );
//   }

//   return children;
// };

// const AdminRoute = ({
//   children,
// }) => {
//   const auth =
//     useSelector(
//       (state) =>
//         state?.auth || {}
//     );

//   const authenticated =
//     auth.isAuthenticated ===
//       true ||
//     auth.authenticated ===
//       true;

//   const role =
//     auth.role ||
//     auth.user?.role;

//   if (!authenticated) {
//     return (
//       <Navigate
//         to="/"
//         replace
//       />
//     );
//   }

//   if (
//     role !== "ADMIN"
//   ) {
//     return (
//       <Navigate
//         to="/dashboard"
//         replace
//       />
//     );
//   }

//   return children;
// };

// const App = () => {
//   return (
//     <div className="app-shell">

//       <Navbar />

//       <Routes>

//         <Route
//           path="/"
//           element={
//             <Login />
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/assets"
//           element={
//             <ProtectedRoute>
//               <AssetList />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/maintenance"
//           element={
//             <ProtectedRoute>
//               <MaintenanceScheduler />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/health"
//           element={
//             <ProtectedRoute>
//               <HealthMonitor />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/reports"
//           element={
//             <ProtectedRoute>
//               <Reports />
//             </ProtectedRoute>
//           }
//         />

        

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/"
//               replace
//             />
//           }
//         />

//       </Routes>

//     </div>
//   );
// };

// // export default App;
// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// import { useSelector } from "react-redux";

// import Navbar from "./components/layout/Navbar";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import AssetList from "./components/asset/AssetList";
// import MaintenanceScheduler from "./components/maintenance/MaintenanceScheduler";
// import HealthMonitor from "./components/HealthMonitor";
// import Reports from "./components/Reports";

// /*
//  * Protected Route
//  *
//  * Any page other than Login requires authentication.
//  */
// const ProtectedRoute = ({
//   children,
// }) => {
//   const auth = useSelector(
//     (state) => state.auth || {}
//   );

//   const isAuthenticated =
//     auth.isAuthenticated === true ||
//     auth.authenticated === true ||
//     !!auth.token ||
//     !!auth.user;

//   if (!isAuthenticated) {
//     return (
//       <Navigate
//         to="/login"
//         replace
//       />
//     );
//   }

//   return children;
// };

// /*
//  * Application layout
//  *
//  * IMPORTANT:
//  * Navbar is deliberately NOT rendered
//  * when the current route is /login.
//  */
// const AppLayout = () => {
//   const location = useLocation();

//   const isLoginPage =
//     location.pathname === "/login" ||
//     location.pathname === "/";

//   return (
//     <>
//       {!isLoginPage && <Navbar />}

//       <Routes>

//         {/* =========================
//             PUBLIC LOGIN PAGE
//            ========================= */}

//         <Route
//           path="/"
//           element={
//             <Login />
//           }
//         />

//         <Route
//           path="/login"
//           element={
//             <Login />
//           }
//         />

//         {/* =========================
//             PROTECTED DASHBOARD
//            ========================= */}

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* =========================
//             ASSETS
//            ========================= */}

//         <Route
//           path="/assets"
//           element={
//             <ProtectedRoute>
//               <AssetList />
//             </ProtectedRoute>
//           }
//         />

//         {/* =========================
//             MAINTENANCE
//            ========================= */}

//         <Route
//           path="/maintenance"
//           element={
//             <ProtectedRoute>
//               <MaintenanceScheduler />
//             </ProtectedRoute>
//           }
//         />

//         {/* =========================
//             HEALTH MONITOR
//            ========================= */}

//         <Route
//           path="/health"
//           element={
//             <ProtectedRoute>
//               <HealthMonitor />
//             </ProtectedRoute>
//           }
//         />

//         {/* =========================
//             REPORTS
//            ========================= */}

//         <Route
//           path="/reports"
//           element={
//             <ProtectedRoute>
//               <Reports />
//             </ProtectedRoute>
//           }
//         />

//         {/* =========================
//             UNKNOWN URL
//            ========================= */}

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/login"
//               replace
//             />
//           }
//         />

//       </Routes>
//     </>
//   );
// };

// /*
//  * Main App
//  */
// const App = () => {
//   return (
//     <BrowserRouter>
//       <AppLayout />
//     </BrowserRouter>
//   );
// };

// export default App;
// import React from "react";
// import {
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// import { useSelector } from "react-redux";

// import Navbar from "./components/layout/Navbar";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import AssetList from "./components/asset/AssetList";
// import MaintenanceScheduler from "./components/maintenance/MaintenanceScheduler";
// import HealthMonitor from "./components/HealthMonitor";
// import Reports from "./components/Reports";

// const ProtectedRoute = ({ children }) => {
//   const auth = useSelector(
//     (state) => state.auth || {}
//   );

//   const authenticated =
//     auth.isAuthenticated === true ||
//     auth.authenticated === true ||
//     !!auth.token ||
//     !!auth.user;

//   if (!authenticated) {
//     return (
//       <Navigate
//         to="/login"
//         replace
//       />
//     );
//   }

//   return children;
// };

// const AppLayout = () => {
//   const location = useLocation();

//   const isLoginPage =
//     location.pathname === "/" ||
//     location.pathname === "/login";

//   return (
//     <>
//       {/* Navbar only after login */}
//       {!isLoginPage && <Navbar />}

//       <Routes>

//         {/* LOGIN */}
//         <Route
//           path="/"
//           element={<Login />}
//         />

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         {/* DASHBOARD */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* ASSETS */}
//         <Route
//           path="/assets"
//           element={
//             <ProtectedRoute>
//               <AssetList />
//             </ProtectedRoute>
//           }
//         />

//         {/* MAINTENANCE */}
//         <Route
//           path="/maintenance"
//           element={
//             <ProtectedRoute>
//               <MaintenanceScheduler />
//             </ProtectedRoute>
//           }
//         />

//         {/* HEALTH */}
//         <Route
//           path="/health"
//           element={
//             <ProtectedRoute>
//               <HealthMonitor />
//             </ProtectedRoute>
//           }
//         />

//         {/* REPORTS */}
//         <Route
//           path="/reports"
//           element={
//             <ProtectedRoute>
//               <Reports />
//             </ProtectedRoute>
//           }
//         />

//         {/* UNKNOWN */}
//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/login"
//               replace
//             />
//           }
//         />

//       </Routes>
//     </>
//   );
// };

// export default AppLayout;
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AssetList from "./components/asset/AssetList";
import MaintenanceScheduler from "./components/maintenance/MaintenanceScheduler";
import HealthMonitor from "./components/HealthMonitor";
import Reports from "./components/Reports";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector(
    (state) => state.auth || {}
  );

  const authenticated =
    auth.isAuthenticated === true ||
    auth.authenticated === true ||
    !!auth.token ||
    !!auth.user;

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

const App = () => {
  const location = useLocation();

  const isLogin =
    location.pathname === "/" ||
    location.pathname === "/login";

  return (
    <>
      {!isLogin && <Navbar />}

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <AssetList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maintenance"
          element={
            <ProtectedRoute>
              <MaintenanceScheduler />
            </ProtectedRoute>
          }
        />

        <Route
          path="/health"
          element={
            <ProtectedRoute>
              <HealthMonitor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </>
  );
};

export default App;