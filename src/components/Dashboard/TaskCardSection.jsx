// // src/components/Employee/TaskCardSection.jsx
// import React from "react";
// import moment from "moment";

// function TaskCardSection({ title, tasks, type, onAction }) {
//   const getStatusBadge = (type) => {
//     switch (type) {
//       case "newTask":
//         return "bg-blue-100 text-blue-600";
//       case "active":
//         return "bg-yellow-100 text-yellow-600";
//       case "completed":
//         return "bg-green-100 text-green-600";
//       case "failed":
//         return "bg-red-100 text-red-600";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
//       <h3 className="text-lg font-semibold mb-4">{title}</h3>

//       {tasks.length === 0 ? (
//         <p className="text-gray-500 text-sm">No tasks here.</p>
//       ) : (
//         <div className="space-y-4">
//           {tasks.map((task) => (
//             <div
//               key={task._id}
//               className="p-4 border rounded-lg space-y-2 shadow-sm"
//             >
//               <div className="flex justify-between items-center">
//                 <h4 className="text-md font-bold">{task.title}</h4>
//                 <span
//                   className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadge(
//                     type
//                   )}`}
//                 >
//                   {type.toUpperCase()}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600">{task.description}</p>
//               <div className="text-xs text-gray-500">
//                 {task.category} | {moment(task.date).format("MMM D, YYYY")}
//               </div>

//               {/* Action Buttons */}
//               {type === "newTask" && (
//                 <button
//                   onClick={() => onAction("accept", task._id)}
//                   className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700"
//                 >
//                   Accept Task
//                 </button>
//               )}

//               {type === "active" && (
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => onAction("complete", task._id)}
//                     className="bg-green-600 text-white px-3 py-1 text-xs rounded hover:bg-green-700"
//                   >
//                     Mark Complete
//                   </button>
//                   <button
//                     onClick={() => onAction("fail", task._id)}
//                     className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700"
//                   >
//                     Mark Failed
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TaskCardSection;


// src/components/Employee/TaskCardSection.jsx
import React from "react";
import moment from "moment";
import {
  ClipboardList,
  Timer,
  CheckCircle2,
  XCircle,
  ArrowRightCircle,
} from "lucide-react";

function TaskCardSection({ title, tasks, type, onAction }) {
  const getStyles = (type) => {
    switch (type) {
      case "newTask":
        return {
          icon: <ClipboardList className="text-blue-500" size={20} />,
          badge: "bg-blue-100 text-blue-600",
        };
      case "active":
        return {
          icon: <Timer className="text-yellow-500" size={20} />,
          badge: "bg-yellow-100 text-yellow-600",
        };
      case "completed":
        return {
          icon: <CheckCircle2 className="text-green-500" size={20} />,
          badge: "bg-green-100 text-green-600",
        };
      case "failed":
        return {
          icon: <XCircle className="text-red-500" size={20} />,
          badge: "bg-red-100 text-red-600",
        };
      default:
        return {
          icon: <ArrowRightCircle size={20} />,
          badge: "bg-gray-100 text-gray-600",
        };
    }
  };

  const { icon, badge } = getStyles(type);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-sm">No tasks here.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 bg-gray-50 rounded-xl border shadow-sm hover:bg-gray-100 transition"
            >
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-md font-bold text-gray-800">
                  {task.title}
                </h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${badge}`}
                >
                  {type.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{task.description}</p>
              <div className="text-xs text-gray-500 mb-2">
                {task.category} • {moment(task.date).format("MMM D, YYYY")}
              </div>

              {/* Action Buttons */}
              {type === "newTask" && (
                <button
                  onClick={() => onAction("accept", task._id)}
                  className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-1 text-xs rounded shadow-sm"
                >
                  Accept Task
                </button>
              )}

              {type === "active" && (
                <div className="space-x-2">
                  <button
                    onClick={() => onAction("complete", task._id)}
                    className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-1 text-xs rounded shadow-sm"
                  >
                    Mark Complete
                  </button>
                  <button
                    onClick={() => onAction("fail", task._id)}
                    className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 text-xs rounded shadow-sm"
                  >
                    Mark Failed
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskCardSection;
