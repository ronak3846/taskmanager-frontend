import React from "react";
import {
  Users,
  ClipboardList,
  CheckCircle,
  ActivitySquare,
} from "lucide-react";

function AdminStatsCards({ employees }) {
  const totalEmployees = employees.length;
  const totalTasks = employees.reduce(
    (sum, emp) =>
      sum + Object.values(emp.taskCount || {}).reduce((a, b) => a + b, 0),
    0
  );
  const completedTasks = employees.reduce(
    (sum, emp) => sum + (emp.taskCount?.completed || 0),
    0
  );
  const activeTasks = employees.reduce(
    (sum, emp) => sum + (emp.taskCount?.active || 0),
    0
  );

  const cards = [
    {
      label: "Employees",
      value: totalEmployees,
      icon: <Users className="text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: <ClipboardList className="text-yellow-600" />,
      color: "bg-yellow-100",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: <CheckCircle className="text-green-600" />,
      color: "bg-green-100",
    },
    {
      label: "Active",
      value: activeTasks,
      icon: <ActivitySquare className="text-purple-600" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl p-4 ${card.color} shadow flex items-center gap-4 transition-transform hover:scale-105`}
        >
          <div className="text-3xl">{card.icon}</div>
          <div>
            <p className="text-sm text-gray-600">{card.label}</p>
            <h3 className="text-xl font-bold">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminStatsCards;
