import React from "react";

function TaskList({ tasks }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.length === 0 ? (
        <p className="text-center col-span-full text-gray-600 dark:text-gray-300">
          No tasks assigned yet.
        </p>
      ) : (
        tasks.map((task, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition hover:shadow-lg dark:shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {task.description}
            </p>

            <div className="mt-3 flex justify-between items-center text-sm">
              <span className="text-blue-600 dark:text-blue-400">
                {task.category}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {task.date}
              </span>
            </div>

            <div className="mt-3 space-y-1 text-sm">
              {task.completed && <p className="text-green-600">✅ Completed</p>}
              {task.newTask && <p className="text-yellow-500">🆕 New Task</p>}
              {task.active && <p className="text-blue-500">🚀 Active</p>}
              {task.failed && <p className="text-red-500">⚠️ failed</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
