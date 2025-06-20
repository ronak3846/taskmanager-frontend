import React, { useContext, useEffect, useState } from "react";
import Header from "../common/Header";
import { AuthContext } from "../../context/AuthProvider";
import CreateTask from "../Tasks/CreateTask";
import API from "../../utils/api";
import EmployeeList from "../Tasks/EmployeeData";
import AdminStatsCards from "../AdminData/AdminStatsCards";
import AllTasksModal from "../AdminData/AllTasksModal";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);

  // const [showModal, setShowModal] = useState(false);
  // const [allTasks, setAllTasks] = useState([]);


  // const fetchAllTasks = async () => {
  //   try {
  //     const res = await API.get("/tasks"); // make sure your backend route exists
  //     setAllTasks(res.data);
  //     setShowModal(true);
  //   } catch (err) {
  //     console.error("Error fetching tasks:", err);
  //   }
  // };
  


  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <Header name={user?.firstname || "Admin"} />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {/* Dashboard Title */}
        <div>
          <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-gray-500">Assign tasks and manage employees.</p>
        </div>

        <div>
          <AdminStatsCards employees={employees} />
        </div>

        {/* <div>
          <button onClick={fetchAllTasks}>📋 View All Tasks</button>

          {showModal && (
            <AllTasksModal
              tasks={allTasks}
              onClose={() => setShowModal(false)}
            />
          )}
        </div> */}

        {/* Create Task Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">Create & Assign Task</h2>
          <CreateTask />
        </div>

        {/* Employee Data Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-6">Employee Overview</h2>
          <div className="overflow-x-auto">
            <EmployeeList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
