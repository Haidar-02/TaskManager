import React, { useState, useEffect } from "react";
import "animate.css/animate.min.css";

const ErrorMessageComponent = ({ message, clearMessage }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      clearMessage();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  });

  return visible ? (
    <div className="text-sm font-light p-3 rounded-lg bg-white text-red-500 flex items-center justify-between z-50 shadow-lg animate__animated animate__slideInDown ">
      <p>{message}</p>
    </div>
  ) : null;
};

export default ErrorMessageComponent;
