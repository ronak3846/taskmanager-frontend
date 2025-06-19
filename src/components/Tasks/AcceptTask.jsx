// import React from "react";
// import axios from "axios";

// function AcceptTask({ data, onStatusChange }) {
//   const updateStatus = async (status) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:5000/api/tasks/update-status/${data.id}`,
//         {
//           status,
//         }
//       );
      
//       if (onStatusChange) onStatusChange(); // Refresh task list in parent
//     } catch (err) {
//       console.error("Failed to update status", err);
//     }
//   };
//   console.log(data);
//   return (
//     <div className="flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl">
//       <div className="flex justify-between items-center">
//         <h3 className="bg-green-600 px-3 py-1 rounded">{data.category}</h3>
//         <h4 className="text-sm">{data.date}</h4>
//       </div>
//       <h2 className="mt-5 text-2xl font-semibold">{data.title}</h2>
//       <p className="text-sm mt-2">{data.description}</p>
//       <div className="flex justify-between mt-4">
//         <button
//           onClick={() => updateStatus("completed")}
//           className="bg-blue-600 py-1 px-4 text-sm rounded text-white"
//         >
//           Mark as Completed
//         </button>
//         <button
//           onClick={() => updateStatus("failed")}
//           className="bg-red-600 py-1 px-4 text-sm rounded text-white"
//         >
//           Mark as Failed
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AcceptTask;
// import React from "react";
// import axios from "axios";

// function AcceptTask({ data, onStatusChange }) {
//   const updateStatus = async (status) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/tasks/update-status/${data.id}`,
//         { status }
//       );
//       if (onStatusChange) onStatusChange();
//     } catch (err) {
//       console.error("Failed to update status", err);
//     }
//   };

//   return (
//     <div className="flex-shrink-0 w-[320px] h-full bg-[#1c1c1c] border border-emerald-500 rounded-xl shadow-lg p-5 transition hover:scale-[1.02]">
//       <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
//         <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
//           {data.category}
//         </span>
//         <span className="text-gray-400">{data.date}</span>
//       </div>

//       <h2 className="text-white text-xl font-bold mt-3">{data.title}</h2>
//       <p className="text-gray-300 text-sm mt-2">{data.description}</p>

//       <div className="flex justify-between gap-2 mt-5">
//         <button
//           onClick={() => updateStatus("completed")}
//           className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg font-semibold transition"
//         >
//           Completed
//         </button>
//         <button
//           onClick={() => updateStatus("failed")}
//           className="w-1/2 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg font-semibold transition"
//         >
//           Failed
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AcceptTask;


import React from "react";
import axios from "axios";

function AcceptTask({ data, onStatusChange, employeeId, taskIndex }) {
  const updateStatus = async (status) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/tasks/update-status/${employeeId}/${taskIndex}`,
        {
          status,
        }
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
