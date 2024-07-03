import axios from 'axios';
import { CONSTANTS } from '../../constants/Constants';

const api = axios.create({
  baseURL: CONSTANTS.BASE_URL, 
});

export const axiosGetTasks = () => api.get('/Tasks');
export const axiosAddNewTask = (task) => api.post('/Tasks', task);
export const axiosUpdateTask = (id, task) => api.put(`/Tasks/${id}`, task);
export const axiosDeleteTask = (id) => api.delete(`/Tasks/${id}`);
