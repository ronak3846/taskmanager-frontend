import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function TaskPieChart({ taskCount }) {
  const pieData = [
    { name: "New", value: taskCount.newTask, color: "#3b82f6" }, // Blue
    { name: "Active", value: taskCount.active, color: "#facc15" }, // Yellow
    { name: "Completed", value: taskCount.completed, color: "#22c55e" }, // Green
    { name: "Failed", value: taskCount.failed, color: "#ef4444" }, // Red
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-center mb-4">
        Task Distribution
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TaskPieChart;
