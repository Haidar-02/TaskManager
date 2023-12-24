import axios from "axios";
import { auth } from "./auth.helper";
const baseUrl = "http://127.0.0.1:8000/api/";

async function allTasks() {
  try {
    const res = await axios.get(`${baseUrl}user/tasks`, auth());
    return res;
  } catch (error) {
    throw error;
  }
}

async function martTaskDone(task_id) {
  try {
    const res = await axios.post(
      `${baseUrl}user/markAsDone/${task_id}`,
      undefined,
      auth()
    );
    return res;
  } catch (error) {
    throw error;
  }
}

async function deleteTask(task_id) {
  try {
    const res = await axios.post(`${baseUrl}user/delete/${task_id}`, auth());
    return res;
  } catch (error) {
    throw error;
  }
}

async function createTask({ title, description, due_date }) {
  try {
    const res = await axios.post(
      `${baseUrl}user/employer/create`,
      {
        title,
        description,
        due_date,
      },
      auth()
    );
    return res;
  } catch (error) {
    throw error;
  }
}

async function editTask({ title, description, due_date, task_id }) {
  try {
    const res = await axios.post(
      `${baseUrl}user/employer/edit/${task_id}`,
      {
        title,
        description,
        due_date,
      },
      auth()
    );
    return res;
  } catch (error) {
    throw error;
  }
}
export { allTasks, martTaskDone, deleteTask, createTask, editTask };
