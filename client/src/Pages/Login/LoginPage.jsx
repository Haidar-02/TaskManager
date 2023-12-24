import React from "react";
import loginPic from "../../Assets/Login/login.svg";
import LoginComponent from "../../Components/LoginComponent/LoginComponent.jsx";

const Login = () => {
  return (
    <div className="flex items-center justify-start bg-gray-200 w-full min-h-screen h-full">
      <div className="flex flex-col gap-10 items-center justify-center flex-grow min-h-screen h-full">
        <img src={loginPic} alt="login" className="w-1/3" />
      </div>
      <div className="h-full min-h-screen p-10 bg-gray-800 flex items-center justify-center">
        <LoginComponent />
      </div>
    </div>
  );
};

export default Login;
