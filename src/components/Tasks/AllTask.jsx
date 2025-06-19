import React, { useEffect, useState, useContext } from "react";
import API from "../../utils/api";
import { AuthContext } from "../../context/AuthProvider";

function AllTask() {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      const res = await API.get(`/tasks/${user._id}`);
      setTasks(res.data.tasks);
    };
    fetchTasks();
  }, [user]);

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.title} - {task.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTask;
