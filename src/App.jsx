// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
// import AdminDashboard from "./components/Dashboard/AdminDashboard";
// import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
// import PrivateRoute from "./routes/PrivateRoute";
// import UserProfile from "./components/Profile/UserProfile"; // ✅ Import

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<UserProfile />} />
//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute role="admin">
//               <AdminDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/employee"
//           element={
//             <PrivateRoute role="employee">
//               <EmployeeDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute role="employee">
//               <UserProfile />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import UserProfile from "./components/Profile/UserProfile";
import PrivateRoute from "./routes/PrivateRoute";
import EmployeeLayout from "./components/Dashboard/EmployeeLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <EmployeeLayout>
                <AdminDashboard />
              </EmployeeLayout>
            </PrivateRoute>
          }
        />

        {/* Employee Routes with Layout */}
        <Route
          path="/employee/dashboard"
          element={
            <PrivateRoute role="employee">
              <EmployeeLayout>
                <EmployeeDashboard />
              </EmployeeLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <PrivateRoute role="employee">
              <EmployeeLayout>
                <UserProfile />
              </EmployeeLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <PrivateRoute role="admin">
              <EmployeeLayout>
                <UserProfile />
              </EmployeeLayout>
            </PrivateRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
