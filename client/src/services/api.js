import axios from "axios";


const API_BASE = "http://localhost:5000/api/tasks";

//* Get all tasks
export const fetchTasks = () => axios.get(API_BASE);

//* Add new task
export const createTask = (taskData) => axios.post(API_BASE, taskData);

//* Update task
export const updateTask = (id, updatedData) => axios.put(`${API_BASE}/${id}`, updatedData);

//* Delete task
export const deleteTask = (id) => axios.delete(`${API_BASE}/${id}`);