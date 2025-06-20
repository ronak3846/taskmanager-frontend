// // src/pages/UserProfile.jsx
// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import API from "../../utils/api"; // ✅ centralized axios

// function UserProfile() {
//   const { user } = useContext(AuthContext);
//   const [name, setName] = useState(user?.firstname || "");
//   const [email] = useState(user?.email || "");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const navigate = useNavigate();

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       // 1. Update profile name (optional)
//       await API.put(`/employees/${user._id}/profile`, {
//         firstname: name,
//         email,
//       });

//       // 2. If password fields are filled, update password
//       if (currentPassword && newPassword) {
//         await API.put(`/employees/${user._id}/change-password`, {
//           currentPassword,
//           newPassword,
//         });
//       }

//       alert("Profile updated!");
//       navigate(-1); // Go back
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile");
//     }
//   };
  

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleUpdate}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
//         <div className="space-y-4">
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Full Name"
//             className="w-full px-4 py-2 border border-gray-300 rounded"
//           />
//           <input
//             type="email"
//             value={email}
//             readOnly
//             className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
//           />
//           <input
//             type="password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             placeholder="Current Password"
//             className="w-full px-4 py-2 border border-gray-300 rounded"
//           />
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             placeholder="New Password"
//             className="w-full px-4 py-2 border border-gray-300 rounded"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Update Profile
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UserProfile;

import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  Mail,
  KeyRound,
  LockKeyhole,
  ArrowLeftCircle,
} from "lucide-react";

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.firstname || "");
  const [email] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/employees/${user._id}/profile`, {
        firstname: name,
        email,
      });

      if (currentPassword && newPassword) {
        await API.put(`/employees/${user._id}/change-password`, {
          currentPassword,
          newPassword,
        });
      }

      toast.success("✅ Profile updated successfully!", {
        position: "top-right",
      });

      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update profile. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <ToastContainer />

      <form
        onSubmit={handleUpdate}
        className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-10 max-w-lg w-full transform transition-all duration-500 hover:scale-[1.01]"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1 animate-pulse">
            Update Profile
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Change your account information
          </p>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <User className="text-indigo-600 dark:text-indigo-300" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="bg-transparent outline-none w-full text-gray-800 dark:text-white"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg cursor-not-allowed">
            <Mail className="text-green-600 dark:text-green-300" />
            <input
              type="email"
              value={email}
              readOnly
              className="bg-transparent outline-none w-full text-gray-500 dark:text-gray-400"
            />
          </div>

          {/* Current Password */}
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <KeyRound className="text-yellow-600 dark:text-yellow-300" />
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="bg-transparent outline-none w-full text-gray-800 dark:text-white"
            />
          </div>

          {/* New Password */}
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <LockKeyhole className="text-pink-600 dark:text-pink-300" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="bg-transparent outline-none w-full text-gray-800 dark:text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white py-2 rounded-lg font-semibold shadow-lg transition duration-300"
          >
            Save Changes
          </button>

          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-2 flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            <ArrowLeftCircle size={18} className="mr-1" /> Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
