import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7278', // Adjust the URL as needed
});

export const axiosGetTasks = () => api.get('/Tasks');
export const axiosAddNewTask = (task) => api.post('/Tasks', task);
export const axiosUpdateTask = (id, task) => api.put(`/Tasks/${id}`, task);
export const axiosDeleteTask = (id) => api.delete(`/Tasks/${id}`);
