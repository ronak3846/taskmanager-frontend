import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
      await axios.post(
        `http://localhost:5000/api/employees/${id}/assign-task`,
        formData
      );
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
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <div className="flex flex-wrap gap-4">
          <label>
            <input type="checkbox" name="active" onChange={handleChange} />{" "}
            Active
          </label>
          <label>
            <input
              type="checkbox"
              name="newTask"
              checked
              onChange={handleChange}
            />{" "}
            New Task
          </label>
          <label>
            <input type="checkbox" name="completed" onChange={handleChange} />{" "}
            Completed
          </label>
          <label>
            <input type="checkbox" name="failed" onChange={handleChange} />{" "}
            failed
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
