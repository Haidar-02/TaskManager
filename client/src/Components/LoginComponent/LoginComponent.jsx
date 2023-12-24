import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Helpers/auth.helper";
import ErrorMessageComponent from "../EventComponents/ErrorMessageComponent";
import SuccessMessageComponent from "../EventComponents/SuccessMessageComponent";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearMessage = () => {
    setErrorMessage("");
    setSuccesMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      setErrorMessage("Please enter both email and password");
    } else {
      setErrorMessage("");
      try {
        setIsLoading(true);
        const response = await login({
          email: formData.email,
          password: formData.password,
        });
        setIsLoading(false);
        if (response.data.status === "error") {
          if (response.status === 401) {
            setErrorMessage("Wrong email or password");
          } else {
            setErrorMessage(response.data.message);
          }
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_id", response.data.user.id);

          setSuccesMessage("Login successful");
          navigate("/dashboard");
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <h1 className="text-2xl">Login To Your Account</h1>
      <div className=" mt-5 flex flex-col items-start justify-center">
        <label htmlFor="email" className="text-sm mt-3">
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          autoComplete="off"
          id="password"
          className="w-full px-2 py-1 bg-white outline-none text-gray-800 focus:border-b-4 border-green-500 rounded-sm transition-all"
        />
        <button
          onClick={handleLogin}
          className="mt-10 bg-white text-gray-800 p-2 text-sm rounded-md w-full hover:bg-yellow-600 hover:text-white transition-all"
        >
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
      <div className="absolute top-10 left-10 z-50">
        {errorMessage && (
          <ErrorMessageComponent
            message={errorMessage}
            clearMessage={clearMessage}
          />
        )}

        {succesMessage && (
          <SuccessMessageComponent
            message={succesMessage}
            clearMessage={clearMessage}
          />
        )}
      </div>
    </div>
  );
};

export default LoginComponent;
