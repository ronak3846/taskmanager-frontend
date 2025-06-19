import React from "react";
import API from "../../utils/api";

function UpdateTaskStatus({ user, taskIndex, statusType }) {
  const handleUpdate = async () => {
    await API.put("/tasks/update-status", {
      employeeId: user._id,
      taskIndex,
      statusType,
    });
  };

  return <button onClick={handleUpdate}>Mark as {statusType}</button>;
}

export default UpdateTaskStatus;
