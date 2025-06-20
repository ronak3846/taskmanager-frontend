import React, { useEffect, useState } from "react";
import ProgressBar from "../DashboardData/ProgressBar";
import StatCards from "../DashboardData/StatCards";
import TaskPieChart from "../DashboardData/TaskPieChart";

function DashboardStats({ name, taskCount }) {
  const [progress, setProgress] = useState(0);

  const total = Object.values(taskCount).reduce((a, b) => a + b, 0);
  const completed = total ? Math.round((taskCount.completed / total) * 100) : 0;

  useEffect(() => {
    let start = 0;
    const duration = 700;
    const stepTime = Math.max(10, Math.floor(duration / completed));

    const interval = setInterval(() => {
      start += 1;
      if (start >= completed) {
        clearInterval(interval);
        setProgress(completed);
      } else {
        setProgress(start);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [completed]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, {name} 👋</h2>

      <ProgressBar progress={progress} />

      <StatCards taskCount={taskCount} />

      <TaskPieChart taskCount={taskCount} />
    </div>
  );
}

export default DashboardStats;
