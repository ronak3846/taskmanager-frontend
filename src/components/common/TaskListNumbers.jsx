import React from "react";

function TaskListNumbers({ taskCount }) {
  const statusList = [
    { label: "New", key: "newTask", color: "bg-yellow-400", icon: "🆕" },
    { label: "Active", key: "active", color: "bg-blue-500", icon: "🚀" },
    { label: "Completed", key: "completed", color: "bg-green-500", icon: "✅" },
    { label: "failed", key: "failed", color: "bg-red-500", icon: "⚠️" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statusList.map(({ label, key, color, icon }) => (
        <div
          key={key}
          className={`rounded-xl shadow-md p-4 text-white ${color} dark:shadow-lg dark:border dark:border-white/10`}
        >
          <div className="flex items-center justify-between">
            <div className="text-2xl">{icon}</div>
            <div className="text-3xl font-bold">{taskCount[key]}</div>
          </div>
          <p className="mt-2 text-sm font-semibold">{label} Tasks</p>
        </div>
      ))}
    </div>
  );
}

export default TaskListNumbers;
