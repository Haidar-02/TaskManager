function formatDateToView(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}

const getStatusColor = (status) => {
  switch (status) {
    case "In Progress":
      return "bg-yellow-500";
    case "Late":
      return "bg-red-500";
    case "Done":
      return "bg-green-500";
    default:
      return "";
  }
};

export { formatDateToView, getStatusColor };
