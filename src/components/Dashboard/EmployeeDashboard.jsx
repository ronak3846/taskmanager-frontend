// import React, { useEffect, useState, useContext } from "react";
// import API from "../../utils/api";

// import Header from "../common/Header";
// import TaskListNumbers from "../common/TaskListNumbers";
// import { AuthContext } from "../../context/AuthProvider";

// function EmployeeDashboard() {
//   const { user } = useContext(AuthContext);
//   const [tasks, setTasks] = useState([]);
//   const [taskCount, setTaskCount] = useState({
//     newTask: 0,
//     active: 0,
//     completed: 0,
//     failed: 0,
//   });
//   const [commentInput, setCommentInput] = useState({});

//   const fetchTasks = async () => {
//     try {
//       const res = await API.get(`/employees/${user._id}/tasks`);
//             setTasks(res.data);

//       const counts = { newTask: 0, active: 0, completed: 0, failed: 0 };
//       res.data.forEach((task) => {
//         if (task.newTask) counts.newTask++;
//         if (task.active) counts.active++;
//         if (task.completed) counts.completed++;
//         if (task.failed) counts.failed++;
//       });
//       setTaskCount(counts);
//     } catch (err) {
//       console.error("❌ Failed to fetch tasks:", err);
//     }
//   };

//   const handleAccept = async (taskId) => {
//     await API.put(`/employees/tasks/${taskId}/accept`);
//     fetchTasks();
//   };

//   const handleComplete = async (taskId) => {
//     await API.put(`/employees/tasks/${taskId}/complete`);
//     fetchTasks();
//   };

//   const handleFail = async (taskId) => {
//     await API.put(`/employees/tasks/${taskId}/fail`);
//     fetchTasks();
//   };

//   const handleAddComment = async (taskId) => {
//     const comment = commentInput[taskId];
//     if (!comment?.trim()) return;

//     await API.post(`/employees/tasks/${taskId}/comments`, { text: comment });
//     setCommentInput({ ...commentInput, [taskId]: "" });
//     fetchTasks();
//   };

//   useEffect(() => {
//     if (user?._id) fetchTasks();
//   }, [user]);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
//       <div className="shadow-md sticky top-0 z-50 bg-white dark:bg-gray-800">
//         <Header name={user?.firstname || "Employee"} />
//       </div>
      

//       <div className="max-w-6xl mx-auto p-4">
//         <h1 className="text-2xl font-semibold mb-4 text-center">
//           Your Task Overview
//         </h1>
//         <TaskListNumbers taskCount={taskCount} />
//       </div>

//       <div className="max-w-6xl mx-auto p-4">
//         <h2 className="text-xl font-semibold mb-4">Assigned Tasks</h2>
//         <div className="grid gap-4">
//           {tasks.map((task) => (
//             <div
//               key={task._id}
//               className="bg-white dark:bg-gray-800 p-4 rounded shadow"
//             >
//               <h3 className="text-lg font-bold mb-2">{task.title}</h3>
//               <p className="mb-2">{task.description}</p>
//               <p className="text-sm text-gray-500 mb-4">{task.date}</p>

//               <div className="flex gap-2">
//                 {task.newTask && (
//                   <button
//                     onClick={() => handleAccept(task._id)}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     Accept
//                   </button>
//                 )}

//                 {task.active && (
//                   <>
//                     <button
//                       onClick={() => handleComplete(task._id)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                       Complete
//                     </button>
//                     <button
//                       onClick={() => handleFail(task._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       Fail
//                     </button>
//                   </>
//                 )}
//               </div>

//               {/* ✅ Comment Input and Display */}
//               <div className="mt-4">
//                 <input
//                   type="text"
//                   placeholder="Add comment"
//                   className="w-full px-2 py-1 text-sm border rounded text-black"
//                   value={commentInput[task._id] || ""}
//                   onChange={(e) =>
//                     setCommentInput({
//                       ...commentInput,
//                       [task._id]: e.target.value,
//                     })
//                   }
//                 />
//                 <button
//                   className="mt-2 bg-gray-800 text-white px-3 py-1 rounded text-sm"
//                   onClick={() => handleAddComment(task._id)}
//                 >
//                   Add Comment
//                 </button>

//                 {task.comments?.length > 0 && (
//                   <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
//                     {task.comments.map((c, idx) => (
//                       <li key={idx}>
//                         • {c.text}{" "}
//                         <span className="text-xs text-gray-400">
//                           ({new Date(c.date).toLocaleDateString()})
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeDashboard;

// import React, { useEffect, useState, useContext } from "react";
// import API from "../../utils/api";
// import { AuthContext } from "../../context/AuthProvider";
// import DashboardStats from "./DashboardStats";
// import TaskCardSection from "./TaskCardSection";

// function EmployeeDashboard() {
//   const { user } = useContext(AuthContext);
//   const [tasks, setTasks] = useState([]);
//   const [taskCount, setTaskCount] = useState({
//     newTask: 0,
//     active: 0,
//     completed: 0,
//     failed: 0,
//   });

//   const handleAction = async (actionType, taskId) => {
//     try {
//       await API.put(`/employees/tasks/${taskId}/${actionType}`);
//       fetchTasks(); // reload
//     } catch (err) {
//       console.error(err);
//       alert("Action failed");
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const res = await API.get(`/employees/${user._id}/tasks`);
//       setTasks(res.data);

//       const counts = { newTask: 0, active: 0, completed: 0, failed: 0 };
//       res.data.forEach((task) => {
//         if (task.newTask) counts.newTask++;
//         if (task.active) counts.active++;
//         if (task.completed) counts.completed++;
//         if (task.failed) counts.failed++;
//       });
//       setTaskCount(counts);
//     } catch (err) {
//       console.error("❌ Failed to fetch tasks:", err);
//     }
//   };

//   useEffect(() => {
//     if (user?._id) fetchTasks();
//   }, [user]);

//   const totalTasks = Object.values(taskCount).reduce((a, b) => a + b, 0);
//   const completedPercent = totalTasks
//     ? Math.round((taskCount.completed / totalTasks) * 100)
//     : 0;

//   const isDueSoon = (date) => {
//     const today = new Date();
//     const taskDate = new Date(date);
//     const diff = (taskDate - today) / (1000 * 60 * 60 * 24);
//     return diff < 3;
//   };



//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition duration-300">
      

//       <div className="max-w-6xl mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4 text-center">Your Dashboard</h1>

        
//         <DashboardStats name={user?.firstname} taskCount={taskCount} />

       
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           <TaskCardSection
//             title="🆕 New Tasks"
//             tasks={tasks.filter((t) => t.newTask)}
//             type="newTask"
//             onAction={handleAction}
//           />
//           <TaskCardSection
//             title="🚀 Active Tasks"
//             tasks={tasks.filter((t) => t.active)}
//             type="active"
//             onAction={handleAction}
//           />
//           <TaskCardSection
//             title="✅ Completed Tasks"
//             tasks={tasks.filter((t) => t.completed)}
//             type="completed"
//           />
//           <TaskCardSection
//             title=" Failed"
//             tasks={tasks.filter((t) => t.failed)}
//             type="failed"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeDashboard;


import React, { useEffect, useState, useContext } from "react";
import API from "../../utils/api";
import { AuthContext } from "../../context/AuthProvider";
import DashboardStats from "./DashboardStats";
import TaskCardSection from "./TaskCardSection";

function EmployeeDashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState({
    newTask: 0,
    active: 0,
    completed: 0,
    failed: 0,
  });

  // Fetch user tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get(`/employees/${user._id}/tasks`);
      setTasks(res.data);

      const counts = { newTask: 0, active: 0, completed: 0, failed: 0 };
      res.data.forEach((task) => {
        if (task.newTask) counts.newTask++;
        if (task.active) counts.active++;
        if (task.completed) counts.completed++;
        if (task.failed) counts.failed++;
      });
      setTaskCount(counts);
    } catch (err) {
      console.error("❌ Failed to fetch tasks:", err);
    }
  };

  // Handle task status actions
  const handleAction = async (actionType, taskId) => {
    try {
      await API.put(`/employees/tasks/${taskId}/${actionType}`);
      fetchTasks(); // reload data
    } catch (err) {
      console.error(err);
      alert("❌ Action failed. Please try again.");
    }
  };

  useEffect(() => {
    if (user?._id) fetchTasks();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Your Dashboard</h1>

        {/* Stats + Chart Section */}
        <DashboardStats name={user?.firstname} taskCount={taskCount} />

        {/* Task Cards Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10">
          <TaskCardSection
            title="New Tasks"
            tasks={tasks.filter((t) => t.newTask)}
            type="newTask"
            onAction={handleAction}
          />
          <TaskCardSection
            title="Active Tasks"
            tasks={tasks.filter((t) => t.active)}
            type="active"
            onAction={handleAction}
          />
          <TaskCardSection
            title="Completed Tasks"
            tasks={tasks.filter((t) => t.completed)}
            type="completed"
          />
          <TaskCardSection
            title="Failed Tasks"
            tasks={tasks.filter((t) => t.failed)}
            type="failed"
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
