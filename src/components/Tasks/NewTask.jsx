import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../common/Header";
import { AuthContext } from "../../context/AuthProvider";
import TaskListNumbers from "../common/TaskListNumbers";

function EmployeeDashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState({
    newTask: 0,
    active: 0,
    completed: 0,
    failed: 0,
  });

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/employees/${user._id}/tasks`
      );
      setTasks(res.data);

      const counts = { newTask: 0, active: 0, completed: 0, failed: 0 };
      res.data.forEach((task) => {
        if (task.newTask) counts.newTask++;
        if (task.active) counts.active++;
        if (task.completed) counts.completed++;
        if (task.failed) counts.failed++;
      });
      setTaskCount(counts);
    } catch (err) {
      console.error("❌ Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchTasks();
  }, [user]);

  const updateStatus = async (taskIndex, statusType) => {
    try {
      await axios.put("http://localhost:5000/api/tasks/update-status", {
        employeeId: user._id,
        taskIndex,
        statusType,
      });
      fetchTasks(); // Refresh after status change
    } catch (error) {
      console.error("❌ Status update failed:", error);
    }
  };

  const renderTasks = (filterKey, title, showButtons = false) => {
    const filtered = tasks.filter((task) => task[filterKey]);
    if (filtered.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((task, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
            >
              <h4 className="text-lg font-semibold">{task.title}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {task.description}
              </p>
              <div className="text-xs text-gray-500 mt-2">
                <span>{task.category}</span> | <span>{task.date}</span>
              </div>

              {showButtons && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => updateStatus(i, "active")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => updateStatus(i, "completed")}
                  >
                    Complete
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => updateStatus(i, "failed")}
                  >
                    Flag
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition duration-300">
      <div className="shadow sticky top-0 bg-white dark:bg-gray-800 z-50">
        <Header name={user?.firstname || "Employee"} />
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Dashboard</h1>
        <TaskListNumbers taskCount={taskCount} />

        {/* Render Sections */}
        {renderTasks("newTask", "🆕 New Tasks", true)}
        {renderTasks("active", "🚀 Active Tasks")}
        {renderTasks("completed", "✅ Completed Tasks")}
        {renderTasks("failed", "⚠️ failed Tasks")}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
