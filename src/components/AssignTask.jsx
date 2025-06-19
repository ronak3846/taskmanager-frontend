import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api"; // ✅ Import shared axios instance

function AssignTask() {
  const { id } = useParams(); // employee ID
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    active: false,
    newTask: true,
    completed: false,
    failed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/employees/${id}/assign-task`, formData); // ✅ Use API
      alert("✅ Task assigned successfully");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Failed to assign task:", err);
      alert("Error assigning task");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">Assign Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <div className="flex flex-wrap gap-4">
          <label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />{" "}
            Active
          </label>
          <label>
            <input
              type="checkbox"
              name="newTask"
              checked={formData.newTask}
              onChange={handleChange}
            />{" "}
            New Task
          </label>
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />{" "}
            Completed
          </label>
          <label>
            <input
              type="checkbox"
              name="failed"
              checked={formData.failed}
              onChange={handleChange}
            />{" "}
            Failed
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
}

export default AssignTask;
