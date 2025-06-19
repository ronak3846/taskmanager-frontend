// import React from "react";

// function CompleteTask({ data }) {
//   return (
//     <div className="flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl">
//       <div className="flex justify-between items-center">
//         <h3 className="bg-blue-600 px-3 py-1 rounded">{data.category}</h3>
//         <h4 className="text-sm">{data.date}</h4>
//       </div>
//       <h2 className="mt-5 text-2xl font-semibold">{data.title}</h2>
//       <p className="text-sm mt-2">{data.description}</p>
//       <div className="mt-2">
//         <button className="w-full">Complete</button>
//       </div>
//     </div>
//   );
// }

// export default CompleteTask;
import React from "react";

function CompleteTask({ data }) {
  return (
    <div className="flex-shrink-0 w-[320px] h-full bg-[#1e293b] border border-blue-500 rounded-xl shadow-lg p-5 transition hover:scale-[1.02]">
      <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {data.category}
        </span>
        <span className="text-gray-400">{data.date}</span>
      </div>

      <h2 className="text-white text-xl font-bold mt-3">{data.title}</h2>
      <p className="text-gray-300 text-sm mt-2">{data.description}</p>

      <div className="mt-4">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg font-semibold transition">
          Complete
        </button>
      </div>
    </div>
  );
}

export default CompleteTask;
