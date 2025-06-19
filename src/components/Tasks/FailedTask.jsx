// import React from "react";

// function FailedTask({ data }) {
//   return (
//     <div className="flex-shrink-0 h-full w-[300px] p-5 bg-gray-400 rounded-xl">
//       <div className="flex justify-between items-center">
//         <h3 className="bg-gray-600 px-3 py-1 rounded">{data.category}</h3>
//         <h4 className="text-sm">{data.date}</h4>
//       </div>
//       <h2 className="mt-5 text-2xl font-semibold">{data.title}</h2>
//       <p className="text-sm mt-2">{data.description}</p>
//       <div className="mt-2">
//         <button className="w-full">Failed</button>
//       </div>
//     </div>
//   );
// }

// export default FailedTask;
import React from "react";

function FailedTask({ data }) {
  return (
    <div className="flex-shrink-0 w-[320px] h-full bg-[#1f2937] border border-red-500 rounded-xl shadow-lg p-5 transition hover:scale-[1.02]">
      <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {data.category}
        </span>
        <span className="text-gray-400">{data.date}</span>
      </div>

      <h2 className="text-white text-xl font-bold mt-3">{data.title}</h2>
      <p className="text-gray-300 text-sm mt-2">{data.description}</p>

      <div className="mt-4">
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg font-semibold transition"
          disabled
        >
          Failed
        </button>
      </div>
    </div>
  );
}

export default FailedTask;
