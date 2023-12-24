import React, { useEffect, useState } from "react";
import { logout, profile } from "../../Helpers/auth.helper";
import { allTasks } from "../../Helpers/tasks.helper";
import { useNavigate } from "react-router-dom";
import TaskView from "../../Components/TaskView/TaskView";
import CreateTask from "../../Components/Modals/CreateTask";
import EmptyPic from "../../Assets/Dashboard/Empty.svg";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const onRequestClose = () => {
    setCreateIsOpen(false);
  };

  const openCreateModal = () => {
    setCreateIsOpen(true);
  };

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

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
        localStorage.setItem("role_id", response.data.role.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isUserAdmin = localStorage.getItem("role_id") === "1";

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
        applyFilter(response.data.tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPofile();
    getTasks();
  }, []);
  useEffect(() => {
    applyFilter(tasks);
  }, [filter, tasks]);

  const applyFilter = (tasksToFilter) => {
    switch (filter) {
      case "all":
        setFilteredTasks(tasksToFilter);
        break;
      case "pending":
        setFilteredTasks(
          tasksToFilter.filter((task) => task.state === "In Progress")
        );
        break;
      case "done":
        setFilteredTasks(tasksToFilter.filter((task) => task.state === "Done"));
        break;
      case "late":
        setFilteredTasks(tasksToFilter.filter((task) => task.state === "Late"));
        break;
      default:
        setFilteredTasks(tasksToFilter);
    }
  };

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
      <div className="p-10 w-full flex items-center justify-between">
        <div>
          <p className="mb-5">Tasks List</p>
          <span
            onClick={() => setFilter("all")}
            className={`text-sm ${
              filter === "all" && " bg-gray-800 text-white"
            } hover:bg-gray-800 hover:text-white transition-all m-2 p-2 cursor-pointer rounded-md`}
          >
            All Tasks
          </span>
          <span
            onClick={() => setFilter("pending")}
            className={`text-sm ${
              filter === "pending" && " bg-yellow-500 text-white"
            } hover:bg-yellow-600 hover:text-white transition-all m-2 p-2 cursor-pointer rounded-md`}
          >
            Pending
          </span>
          <span
            onClick={() => setFilter("done")}
            className={`text-sm ${
              filter === "done" && " bg-green-500 text-white"
            } hover:bg-green-600 hover:text-white transition-all m-2 p-2 cursor-pointer rounded-md`}
          >
            Done
          </span>
          <span
            onClick={() => setFilter("late")}
            className={`text-sm ${
              filter === "late" && " bg-red-500 text-white"
            } hover:bg-red-600 hover:text-white transition-all m-2 p-2 cursor-pointer rounded-md`}
          >
            Late
          </span>
        </div>
        {isUserAdmin && (
          <button
            onClick={() => {
              openCreateModal();
            }}
            className="p-2 bg-gray-800 text-white hover:bg-opacity-70 transition-all text-sm rounded-md"
          >
            Add New Task
          </button>
        )}
      </div>

      <div className="p-10 flex flex-wrap items-center justify-start">
        {filteredTasks.length === 0 ? (
          <div className="flex gap-10 items-center justify-center">
            <img src={EmptyPic} alt="No tasks" className="w-1/3" />
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskView
              key={task.id}
              task={task}
              getTasks={getTasks}
              isUserAdmin={isUserAdmin}
            />
          ))
        )}
      </div>
      <CreateTask
        fetchTasks={getTasks}
        isOpen={createIsOpen}
        onRequestClose={onRequestClose}
      />
    </div>
  );
};

export default Dashboard;
