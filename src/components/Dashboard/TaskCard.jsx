import React from "react";
import API from "../../utils/api";

function TaskCard({ title, tasks, showButtons = false, refreshTasks }) {
  const isDueSoon = (date) => {
    const today = new Date();
    const taskDate = new Date(date);
    const diff = (taskDate - today) / (1000 * 60 * 60 * 24);
    return diff < 3;
  };

  const updateTaskStatus = async (taskId, action) => {
    try {
      await API.put(`/employees/tasks/${taskId}/${action}`);
      refreshTasks(); // Callback to refresh
    } catch (error) {
      console.error(`❌ Failed to ${action} task`, error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task._id} className="border-l-4 border-blue-600 pl-3">
            <h4 className="font-bold">{task.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {task.description}
              {isDueSoon(task.date) && (
                <span className="text-red-500 ml-2 text-xs">Due Soon</span>
              )}
            </p>
            <div className="text-xs text-gray-500">
              {task.category} | {task.date}
            </div>

            {showButtons && (
              <div className="flex gap-2 mt-2">
                {task.newTask && (
                  <>
                    <button
                      className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => updateTaskStatus(task._id, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => updateTaskStatus(task._id, "fail")}
                    >
                      Fail
                    </button>
                  </>
                )}
                {task.active && (
                  <>
                    <button
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => updateTaskStatus(task._id, "complete")}
                    >
                      Complete
                    </button>
                    <button
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => updateTaskStatus(task._id, "fail")}
                    >
                      Fail
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskCard;
