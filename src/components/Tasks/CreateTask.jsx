// // components/Admin/CreateTask.jsx
// import React, { useEffect, useState } from "react";
// import API from "../../utils/api";

// function CreateTask() {
//   const [employees, setEmployees] = useState([]);
//   const [formData, setFormData] = useState({
//     employeeId: "",
//     title: "",
//     description: "",
//     category: "",
//     date: "",
//   });

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const res = await API.get("/employees");
//       setEmployees(res.data);
//     };
//     fetchEmployees();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/tasks/assign", formData);
//       alert("✅ Task assigned successfully");
//       setFormData({
//         employeeId: "",
//         title: "",
//         description: "",
//         category: "",
//         date: "",
//       });
//     } catch (error) {
//       console.error("Error assigning task", error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-4 space-y-4 bg-white dark:bg-gray-900 rounded-xl shadow"
//     >
//       <h2 className="text-lg font-bold dark:text-white">Assign New Task</h2>
//       <select
//         value={formData.employeeId}
//         onChange={(e) =>
//           setFormData({ ...formData, employeeId: e.target.value })
//         }
//         required
//         className="w-full p-2 border dark:bg-gray-800 dark:text-white rounded"
//       >
//         <option value="">Select Employee</option>
//         {employees.map((emp) => (
//           <option key={emp._id} value={emp._id}>
//             {emp.firstname} - {emp.email}
//           </option>
//         ))}
//       </select>

//       <input
//         type="text"
//         placeholder="Task Title"
//         value={formData.title}
//         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//         required
//         className="w-full p-2 border dark:bg-gray-800 dark:text-white rounded"
//       />
//       <textarea
//         placeholder="Description"
//         value={formData.description}
//         onChange={(e) =>
//           setFormData({ ...formData, description: e.target.value })
//         }
//         required
//         className="w-full p-2 border dark:bg-gray-800 dark:text-white rounded"
//       />
//       <input
//         type="text"
//         placeholder="Category"
//         value={formData.category}
//         onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//         required
//         className="w-full p-2 border dark:bg-gray-800 dark:text-white rounded"
//       />
//       <input
//         type="date"
//         value={formData.date}
//         onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//         required
//         className="w-full p-2 border dark:bg-gray-800 dark:text-white rounded"
//       />
//       <button
//         type="submit"
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Assign Task
//       </button>
//     </form>
//   );
// }

// export default CreateTask;

// components/Admin/CreateTask.jsx
import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import {
  UserPlus,
  FileText,
  AlignLeft,
  Tags,
  CalendarDays,
  Send,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function CreateTask() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    title: "",
    description: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await API.get("/employees");
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks/assign", formData);
      toast.success("✅ Task assign successfully!", {
                       position: "top-right",
                     });
      setFormData({
        employeeId: "",
        title: "",
        description: "",
        category: "",
        date: "",
      });
    } catch (error) {
      console.error("Error assigning task", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md space-y-5 animate-fade-in"
    >
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
        <UserPlus /> Assign New Task
      </h2>

      {/* Employee Select */}
      <div className="relative">
        <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">
          Select Employee
        </label>
        <select
          value={formData.employeeId}
          onChange={(e) =>
            setFormData({ ...formData, employeeId: e.target.value })
          }
          required
          className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
        >
          <option value="">Choose one</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.firstname} - {emp.email}
            </option>
          ))}
        </select>
      </div>

      {/* Task Title */}
      <div className="relative">
        <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">
          Task Title
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
          />
          <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">
          Description
        </label>
        <div className="relative">
          <textarea
            rows="3"
            placeholder="Write task description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
          />
          <AlignLeft className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">
          Category
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Design, Development, etc."
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
          />
          <Tags className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">
          Due Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            required
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
          />
          <CalendarDays className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Send size={18} /> Assign Task
        </button>
      </div>
    </form>
  );
}

export default CreateTask;
