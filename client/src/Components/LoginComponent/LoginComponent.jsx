import React from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl">Login To Your Account</h1>
      <div className=" mt-5 flex flex-col items-start justify-center">
        <label htmlFor="email" className="text-sm mt-3">
          Email
        </label>
        <input
          type="email"
          name="email"
          autoComplete="off"
          id="email"
          className="w-full px-2 py-1 bg-white outline-none text-gray-800 focus:border-b-4 border-green-500 rounded-sm transition-all"
        />
        <label htmlFor="password" className="text-sm mt-3">
          Password
        </label>
        <input
          type="password"
          name="password"
          autoComplete="off"
          id="password"
          className="w-full px-2 py-1 bg-white outline-none text-gray-800 focus:border-b-4 border-green-500 rounded-sm transition-all"
        />
        <button className="mt-10 bg-white text-gray-800 p-2 text-sm rounded-md w-full hover:bg-yellow-600 hover:text-white transition-all">
          Login
        </button>
      </div>
      <div className="text-sm w-full mt-10 fle">
        Don't have an account?{" "}
        <span
          onClick={() => {
            navigate("/register");
          }}
          className="hover:underline cursor-pointer"
        >
          Register now
        </span>
      </div>
    </div>
  );
};

export default LoginComponent;
