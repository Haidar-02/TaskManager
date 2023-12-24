import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessageComponent from "../EventComponents/ErrorMessageComponent";
import SuccessMessageComponent from "../EventComponents/SuccessMessageComponent";
import { register } from "../../Helpers/auth.helper";

const RegisterComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");
  const clearMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    if (
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.name.trim() === ""
    ) {
      setErrorMessage("Please fill all required fields");
    } else if (!isValidEmail(formData.email)) {
      setErrorMessage("Invalid email address");
    } else {
      setErrorMessage("");
      try {
        setIsLoading(true);
        const response = await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
        setIsLoading(false);
        console.log(response);
        if (response.data.status === "error") {
          setErrorMessage(response.data.message);
        } else {
          setSuccessMessage(response.data.message);
          navigate("/login");
        }
      } catch (error) {
        if (error.response.status === 422) {
          setErrorMessage("Email already in use");
        } else {
          setErrorMessage("Could not register , try again later.");
        }
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div className="h-full bg-white animate-loading-bar shadow-lg"></div>
        </div>
      )}
      <h1 className="text-2xl">Register Now</h1>
      <div className=" mt-5 flex flex-col items-start justify-center">
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          className="w-full px-2 py-1 bg-white outline-none text-gray-800 focus:border-b-4 border-yellow-500 rounded-sm transition-all"
        />
        <button
          onClick={handleRegister}
          className="mt-10 bg-white text-gray-800 p-2 text-sm rounded-md w-full hover:bg-green-600 hover:text-white transition-all"
        >
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

      <div className="absolute top-10 right-10 z-50">
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

export default RegisterComponent;
