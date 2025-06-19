import React, { useEffect, useState } from "react";
import API from "../../utils/api";


function EmployeeList() {
  const [employees, setEmployees] = useState([]);

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

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Employee Data</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">New</th>
              <th className="py-2 px-4">Active</th>
              <th className="py-2 px-4">Completed</th>
              <th className="py-2 px-4">failed</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-b dark:border-gray-700">
                <td className="py-2 px-4">{emp.firstname}</td>
                <td className="py-2 px-4">{emp.email}</td>
                <td className="py-2 px-4">{emp.taskCount?.newTask}</td>
                <td className="py-2 px-4">{emp.taskCount?.active}</td>
                <td className="py-2 px-4">{emp.taskCount?.completed}</td>
                <td className="py-2 px-4">{emp.taskCount?.failed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
