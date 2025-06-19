import React from "react";
import API from "../utils/api";


function AcceptTask({ data, onStatusChange, employeeId, taskIndex }) {
  const updateStatus = async (status) => {
    try {
      const res = await API.patch(
        `/tasks/update-status/${employeeId}/${taskIndex}`,
        { status }
      );
      
      

      if (onStatusChange) onStatusChange();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="flex-shrink-0 h-full w-[320px] p-5 bg-green-500 rounded-xl shadow-lg">
      <div className="flex justify-between items-center text-sm text-white mb-2">
        <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-medium">
          {data.category}
        </span>
        <span className="text-white">{data.date}</span>
      </div>

      <h2 className="text-white text-xl font-bold mt-3">{data.title}</h2>
      <p className="text-white text-sm mt-2">{data.description}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => updateStatus("completed")}
          className="bg-blue-600 py-2 px-4 rounded text-white hover:bg-blue-700"
        >
          Completed
        </button>
        <button
          onClick={() => updateStatus("failed")}
          className="bg-red-600 py-2 px-4 rounded text-white hover:bg-red-700"
        >
          Failed
        </button>
      </div>
    </div>
  );
}

export default AcceptTask;
