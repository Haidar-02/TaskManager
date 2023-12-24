import React from "react";
import RegisterComponent from "../../Components/RegisterComponent/RegisterComponent.jsx";
import regPic from "../../Assets/Register/register.svg";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-start bg-gray-200 w-full min-h-screen h-full">
      <div className="h-full min-h-screen p-10 bg-gray-800 flex items-center justify-center">
        <RegisterComponent />
      </div>
      <div className="flex flex-col gap-10 items-center justify-center flex-grow min-h-screen h-full">
        <img src={regPic} alt="register" className="w-1/3" />
      </div>
    </div>
  );
};

export default RegisterPage;
