import React from "react";
import {
  ClipboardList,
  Timer,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";

function StatCards({ taskCount }) {
  const stats = [
    {
      label: "New",
      count: taskCount.newTask,
      color: "border-blue-500",
      icon: <ClipboardList className="text-blue-500" />,
      tooltip: "Tasks assigned but not yet started",
    },
    {
      label: "Active",
      count: taskCount.active,
      color: "border-yellow-500",
      icon: <Timer className="text-yellow-500" />,
      tooltip: "Tasks you’re currently working on",
    },
    {
      label: "Completed",
      count: taskCount.completed,
      color: "border-green-500",
      icon: <CheckCircle2 className="text-green-500" />,
      tooltip: "Tasks you’ve finished successfully",
    },
    {
      label: "Failed",
      count: taskCount.failed,
      color: "border-red-500",
      icon: <XCircle className="text-red-500" />,
      tooltip: "Tasks that were not completed in time",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-white rounded-xl p-4 shadow border-l-8 ${stat.color} relative group transform transition duration-300 hover:scale-105 hover:shadow-lg`}
        >
          <div className="flex items-center gap-3 mb-2">
            {stat.icon}
            <p className="text-sm text-gray-600">{stat.label} Tasks</p>
            <div className="relative">
              <Info size={16} className="text-gray-400 cursor-pointer" />
              <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                {stat.tooltip}
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800">{stat.count}</h3>
        </div>
      ))}
    </div>
  );
}

export default StatCards;
