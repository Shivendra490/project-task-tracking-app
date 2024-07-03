import axios from "axios";
import { DOMAIN } from "../constant";
import { getUserInfo } from "./localStoage";
const createTask = async (task) => {
  const { token } = getUserInfo();

  try {
    const headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
    const response = axios.post(`${DOMAIN}/task/create-task`, task, {
      headers,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

const fetchAllStatusTask = async (filter) => {
  const { token } = getUserInfo();

  try {
    const headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
    const response = axios.get(
      `${DOMAIN}/task/all-status-task?filter=${filter}`,
      { headers }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

const deleteTask = async (taskId) => {
  const { token } = getUserInfo();

  try {
    const headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
    const response = axios.delete(`${DOMAIN}/task/delete-task/${taskId}`, {
      headers,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

const getTask = async (taskId) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = axios.get(`${DOMAIN}/task/get-task/${taskId}`, {
      headers,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

const updateTask = async (task) => {
  const { token } = getUserInfo();

  try {
    const headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
    const response = axios.patch(
      `${DOMAIN}/task/update-task/${task._id}`,
      task,
      { headers }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

const fetchTaskStatusCounts = async () => {
  const { token, userId } = getUserInfo();

  try {
    const headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
    const response = axios.get(`${DOMAIN}/task/task-status-counts/${userId}`, {
      headers,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export {
  createTask,
  fetchAllStatusTask,
  deleteTask,
  getTask,
  updateTask,
  fetchTaskStatusCounts,
};
