import React from "react";
import { XCircle } from "lucide-react";
import moment from "moment";

function AllTasksModal({ tasks, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-start overflow-y-auto pt-10">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg relative p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <XCircle size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">All Tasks</h2>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm">No tasks found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Employee</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const status = task.completed
                    ? "Completed"
                    : task.failed
                    ? "Failed"
                    : task.active
                    ? "Active"
                    : "New";

                  const statusColor =
                    status === "Completed"
                      ? "text-green-600"
                      : status === "Failed"
                      ? "text-red-600"
                      : status === "Active"
                      ? "text-yellow-600"
                      : "text-blue-600";

                  return (
                    <tr key={task._id} className="border-b">
                      <td className="py-2 px-4">{task.title}</td>
                      <td className="py-2 px-4">
                        {task.assignedTo?.firstname || "N/A"}
                      </td>
                      <td className="py-2 px-4">{task.category}</td>
                      <td className="py-2 px-4">
                        {moment(task.date).format("MMM D, YYYY")}
                      </td>
                      <td className={`py-2 px-4 font-medium ${statusColor}`}>
                        {status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllTasksModal;
