import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl">Register Now</h1>
      <div className=" mt-5 flex flex-col items-start justify-center">
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          id="name"
          className="w-full px-2 py-1 bg-white outline-none text-gray-800 focus:border-b-4 border-yellow-500 rounded-sm transition-all"
        />
        <label htmlFor="email" className="text-sm mt-3">
          Email
        </label>
        <input
          type="email"
          name="email"
          autoComplete="off"
          id="email"
          className="w-full px-2 py-1 bg-white outline-none text-gray-800 focus:border-b-4 border-yellow-500 rounded-sm transition-all"
        />
        <label htmlFor="password" className="text-sm mt-3">
          Password
        </label>
        <input
          type="password"
          name="password"
          autoComplete="off"
          id="password"
          className="w-full px-2 py-1 bg-white outline-none text-gray-800 focus:border-b-4 border-yellow-500 rounded-sm transition-all"
        />
        <button className="mt-10 bg-white text-gray-800 p-2 text-sm rounded-md w-full hover:bg-green-600 hover:text-white transition-all">
          Register
        </button>
      </div>
      <div className="text-sm w-full mt-10 fle">
        Already have an account?{" "}
        <span
          onClick={() => {
            navigate("/login");
          }}
          className="hover:underline cursor-pointer"
        >
          Signin
        </span>
      </div>
    </div>
  );
};

export default RegisterComponent;
