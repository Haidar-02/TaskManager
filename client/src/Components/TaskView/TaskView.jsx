import React, { useState } from "react";
import { formatDateToView, getStatusColor } from "../../Helpers/helpers";
import EditTask from "../Modals/EditTask";
import { deleteTask, martTaskDone } from "../../Helpers/tasks.helper";
import ErrorMessageComponent from "../EventComponents/ErrorMessageComponent";
import SuccessMessageComponent from "../EventComponents/SuccessMessageComponent";

const TaskView = ({ task, getTasks }) => {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");
  const clearMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };
  const onRequestCloseEdit = () => {
    setEditIsOpen(false);
  };

  const handleDeleteTask = async () => {
    try {
      const response = await deleteTask(task.id);
      if (response.data.status === "error") {
        setErrorMessage(response.data.message);
      } else {
        setSuccessMessage(response.data.message);
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskDone = async () => {
    try {
      const response = await martTaskDone(task.id);
      console.log(response);
      if (response.data.status === "error") {
        setErrorMessage(response.data.message);
      } else {
        setSuccessMessage(response.data.message);
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = () => {
    setEditIsOpen(true);
  };
  return (
    <div>
      <div className=" flex flex-col items-start justify-between border p-4 m-2 rounded-md bg-white shadow-md max-w-96 w-96 hover:scale-95 transition-all relative">
        <div
          className={`absolute min-h-2 w-full  ${getStatusColor(
            task.state
          )} top-0 left-0 right-0`}
        ></div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-sm">{task.description}</p>
        <p className="text-sm">
          Due{" "}
          <span className=" font-semibold">
            {formatDateToView(task.due_date)}
          </span>
        </p>
        <div className="w-full flex justify-between items-center mt-2 gap-3">
          <button
            onClick={() => openEditModal()}
            className=" px-2 py-1 bg-gray-800 text-white hover:opacity-80 flex-1 text-sm rounded-sm transition-all"
          >
            edit
          </button>
          <button
            onClick={handleDeleteTask}
            className=" px-2 py-1 bg-red-600 text-white hover:opacity-80 flex-1 text-sm rounded-sm transition-all"
          >
            delete
          </button>
        </div>

        <button
          onClick={handleTaskDone}
          className={`self-center mt-2 px-2 py-1 w-full text-white text-sm rounded-sm hover:opacity-80 transition-all ${
            task.is_done ? "bg-gray-600" : "bg-green-800 "
          }`}
        >
          {task.is_done ? "Undo" : "Mark as Done"}
        </button>
        {task && (
          <EditTask
            fetchTasks={getTasks}
            isOpen={editIsOpen}
            onRequestClose={onRequestCloseEdit}
            task={task}
          />
        )}
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
    </div>
  );
};

export default TaskView;
