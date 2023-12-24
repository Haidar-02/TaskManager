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

export { allTasks };
