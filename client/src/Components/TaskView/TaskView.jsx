import React from "react";
import { formatDateToView, getStatusColor } from "../../Helpers/helpers";

const TaskView = ({ task }) => {
  console.log(task);
  return (
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
        <button className=" px-2 py-1 bg-gray-800 text-white hover:opacity-80 flex-1 text-sm rounded-sm transition-all">
          edit
        </button>
        <button className=" px-2 py-1 bg-red-600 text-white hover:opacity-80 flex-1 text-sm rounded-sm transition-all">
          delete
        </button>
      </div>

      <button className=" self-center mt-2 px-2 py-1 bg-green-800 w-full text-white hover:opacity-80 text-sm rounded-sm transition-all">
        Mark as Done
      </button>
    </div>
  );
};

export default TaskView;
