// components/Admin/CreateTask.jsx
import React, { useEffect, useState } from "react";
import API from "../../utils/api";

function CreateTask() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    title: "",
    description: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await API.get("/employees");
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks/assign", formData);
      alert("✅ Task assigned successfully");
      setFormData({
        employeeId: "",
        title: "",
        description: "",
        category: "",
        date: "",
      });
    } catch (error) {
      console.error("Error assigning task", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-white dark:bg-gray-900 rounded-xl shadow"
    >
      <h2 className="text-lg font-bold dark:text-white">Assign New Task</h2>
      <select
        value={formData.employeeId}
        onChange={(e) =>
          setFormData({ ...formData, employeeId: e.target.value })
        }
        required
        className="w-full p-2 border dark:bg-gray-800 dark:text-white rounded"
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.firstname} - {emp.email}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Task Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        className="w-full p-2 border dark:bg-gray-800 dark:text-white rounded"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
        className="w-full p-2 border dark:bg-gray-800 dark:text-white rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
        className="w-full p-2 border dark:bg-gray-800 dark:text-white rounded"
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
        className="w-full p-2 border dark:bg-gray-800 dark:text-white rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Assign Task
      </button>
    </form>
  );
}

export default CreateTask;
