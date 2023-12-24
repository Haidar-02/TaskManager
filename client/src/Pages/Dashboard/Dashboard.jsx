import React, { useEffect, useState } from "react";
import { logout, profile } from "../../Helpers/auth.helper";
import { allTasks } from "../../Helpers/tasks.helper";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [tasks, setTasks] = useState([]);

  const getPofile = async () => {
    try {
      setIsLoading(true);
      const response = await profile();
      setIsLoading(false);
      if (response?.data.message === "Unauthorized") {
        navigate("/login");
      }
      if (response.data.status === "success") {
        setUser(response.data.user);
        setRole(response.data.role.role_name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.data.status === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const response = await allTasks();
      setIsLoading(false);
      if (response?.data.message === "Unauthorized") {
        navigate("/login");
      }
      if (response.data.status === "success") {
        setTasks(response.data.tasks);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPofile();
    getTasks();
  }, []);
  return (
    <div className="flex flex-col items-center justify-start bg-gray-200 w-full min-h-screen h-full">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <header className=" cursor-default p-4 bg-gray-800 text-white w-full flex items-start justify-between flex-wrap gap-5">
        <h2>Task Management Dashboard</h2>
        <div className="flex gap-8 items-center justify-end">
          {user?.name && (
            <p>
              Welcome <span className=" font-bold">{user.name}</span>
              {role && <span className="text-sm text-gray-200"> ({role})</span>}
            </p>
          )}
          <button
            onClick={() => handleLogout()}
            className="border-b-2 border-white hover:border-red-600 transition-all px-1"
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
