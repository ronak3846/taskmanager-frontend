// import React, { useEffect, useState } from "react";
// import API from "../../utils/api";


// function EmployeeList() {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await API.get("/employees");
//         setEmployees(res.data);
//       } catch (err) {
//         console.error("Error fetching employees:", err);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4">Employee Data</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
//           <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
//             <tr>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Email</th>
//               <th className="py-2 px-4">New</th>
//               <th className="py-2 px-4">Active</th>
//               <th className="py-2 px-4">Completed</th>
//               <th className="py-2 px-4">failed</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp) => (
//               <tr key={emp._id} className="border-b dark:border-gray-700">
//                 <td className="py-2 px-4">{emp.firstname}</td>
//                 <td className="py-2 px-4">{emp.email}</td>
//                 <td className="py-2 px-4">{emp.taskCount?.newTask}</td>
//                 <td className="py-2 px-4">{emp.taskCount?.active}</td>
//                 <td className="py-2 px-4">{emp.taskCount?.completed}</td>
//                 <td className="py-2 px-4">{emp.taskCount?.failed}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default EmployeeList;


import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import {
  ClipboardList,
  Timer,
  CheckCircle2,
  XCircle,
  Search,
  User,
  Mail,
} from "lucide-react";

import { Download } from "lucide-react"; // icon
import { saveAs } from "file-saver";






function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");


  const downloadCSV = () => {
    const headers = ["Name", "Email", "New", "Active", "Completed", "Failed"];
    const rows = employees.map((emp) => [
      emp.firstname,
      emp.email,
      emp.taskCount?.newTask || 0,
      emp.taskCount?.active || 0,
      emp.taskCount?.completed || 0,
      emp.taskCount?.failed || 0,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "employee-tasks.csv");
  };

  const statusOptions = [
    { key: "all", label: "All", icon: null },
    { key: "newTask", label: "New", icon: <ClipboardList size={16} /> },
    { key: "active", label: "Active", icon: <Timer size={16} /> },
    { key: "completed", label: "Completed", icon: <CheckCircle2 size={16} /> },
    { key: "failed", label: "Failed", icon: <XCircle size={16} /> },
  ];


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const matchSearch =
      emp.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === "all" || emp.taskCount?.[statusFilter] > 0;

    return matchSearch && matchStatus;
  });

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md transition duration-300">
      {/* Heading and search */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <ClipboardList size={24} /> Employee Overview
        </h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {statusOptions.map((status) => (
          <button
            key={status.key}
            onClick={() => setStatusFilter(status.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 border transition 
              ${
                statusFilter === status.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              }`}
          >
            {status.icon} {status.label}
          </button>
        ))}
      </div>

      <div>
        <button
          onClick={downloadCSV}
          className="mb-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Download size={18} /> Download CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="py-3 px-4">👤 Name</th>
              <th className="py-3 px-4">📧 Email</th>
              <th className="py-3 px-4 text-center">New</th>
              <th className="py-3 px-4 text-center">Active</th>
              <th className="py-3 px-4 text-center">Completed</th>
              <th className="py-3 px-4 text-center">Failed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No employees match this filter.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr
                  key={emp._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="py-2 px-4 text-gray-800 dark:text-white flex items-center gap-2">
                    <User className="text-blue-400" size={18} /> {emp.firstname}
                  </td>
                  <td className="py-2 px-4 text-gray-600 dark:text-gray-300">
                    <Mail className="inline mr-1 text-gray-400" size={16} />
                    {emp.email}
                  </td>
                  <td className="py-2 px-4 text-blue-500 font-semibold text-center">
                    {emp.taskCount?.newTask || 0}
                  </td>
                  <td className="py-2 px-4 text-yellow-500 font-semibold text-center">
                    {emp.taskCount?.active || 0}
                  </td>
                  <td className="py-2 px-4 text-green-600 font-semibold text-center">
                    {emp.taskCount?.completed || 0}
                  </td>
                  <td className="py-2 px-4 text-red-500 font-semibold text-center">
                    {emp.taskCount?.failed || 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;

