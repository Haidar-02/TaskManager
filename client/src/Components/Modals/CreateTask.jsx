import React, { useState } from "react";
import Modal from "react-modal";

import SuccessMessageComponent from "../EventComponents/SuccessMessageComponent";
import ErrorMessageComponent from "../EventComponents/ErrorMessageComponent";
import { createTask } from "../../Helpers/tasks.helper";

const CreateTask = ({ fetchTasks, isOpen, onRequestClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
  });

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

  const handleCreateTask = async () => {
    if (
      formData.title === "" ||
      formData.description === "" ||
      !formData.due_date
    ) {
      setErrorMessage("Please fill all required fields");
    } else {
      setErrorMessage("");
      try {
        const response = await createTask(
          formData.title,
          formData.description,
          formData.due_date
        );
        console.log(response);
        if (response.data.status === "error") {
          setErrorMessage(response.data.message);
          return;
        } else {
          onRequestClose();
          fetchTasks();
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onClick={() => onRequestClose}
      className={
        "bg-gray-800 p-5 w-1/2 mt-20 right-1/2 translate-x-1/2 rounded-lg text-white"
      }
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold">Create new project</h2>
        </div>
        <div className="flex flex-col items-start mt-5 justify-start w-2/3">
          <label htmlFor="title" className="text-sm">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            placeholder="enter task title here"
            id="title"
            className="p-1 py-2  text-sm w-full outline-none focus:border-b-4 border-yellow-500 transition-all text-black"
            autoComplete="off"
          />
          <label htmlFor="description" className="text-sm mt-3">
            Task Description
          </label>
          <textarea
            type="text"
            name="description"
            onChange={handleInputChange}
            placeholder="enter task description here"
            id="description"
            className="p-1 py-2 text-sm w-full outline-none focus:border-b-4 border-yellow-500 transition-all text-black"
            autoComplete="off"
          />
          <label htmlFor="due_date" className="text-sm mt-3">
            Task Due Date
          </label>
          <input
            type="date"
            name="due_date"
            onChange={handleInputChange}
            id="due_date"
            className="p-1 py-2 text-sm w-full outline-none focus:border-b-4 border-yellow-500 transition-all text-black"
            autoComplete="off"
          />
          <div className="mt-5 w-full flex items-center justify-end gap-5">
            <button
              onClick={() => onRequestClose()}
              className="p-2  text-xs bg-red-500 hover:opacity-80 transition-all rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTask}
              className=" self-end  text-xs bg-white text-gray-800 hover:opacity-80 transition-all p-2 rounded-md"
            >
              Create
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-10">
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
    </Modal>
  );
};

export default CreateTask;
