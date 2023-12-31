import React from "react";
import taskPic from "../../Assets/Landing/tasks.svg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-start bg-gray-200 w-full min-h-screen h-full">
      <header className="flex justify-between items-center py-3 px-10 w-full bg-gray-800 text-white shadow-2xl">
        <h2 className="text-xl tracking-wider">Task Manager</h2>
        <div className="flex gap-5 items-center justify-end">
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="border-b-2 border-white hover:border-green-500 hover:shadow-md transition-all px-3 py-1"
          >
            Register
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="border-b-2 border-white hover:border-yellow-500 hover:shadow-md transition-all px-3 py-1"
          >
            Login
          </button>
        </div>
      </header>
      <div className=" flex-grow flex items-center justify-center gap-5 flex-wrap">
        <div className="flex items-end gap-3 flex-col justify-center p-5 cursor-default">
          <h1 className="text-3xl tracking-widest">Task Manager</h1>
          <p className="tracking-wide">Manage your tasks now efficiently</p>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="bg-gray-800 w-full mt-5 text-white hover:bg-opacity-70 hover:shadow-xl transition-all px-3 py-1 rounded-md"
          >
            Join Now
          </button>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={taskPic}
            alt="Task pic"
            className=" drop-shadow-2xl w-4/5"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
