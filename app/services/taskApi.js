import axios from "axios";

const API_URL = "/api/tasks";

export const getTasks = async (page = 1, limit = 10) => {
    const { data: response } = await axios.get(`${API_URL}?_page=${page}&_per_page=${limit}`);
    const tasks = response.data.map(task => ({ ...task, id: task._id || task.id }));
    return { ...response, data: tasks };
};

export const addTask = async (task) => {
    const { data } = await axios.post(`${API_URL}`, task);
    return data;
};

export const updateTask = async (id, updatedTask) => {
    const { data } = await axios.put(`${API_URL}/${id}`, { ...updatedTask, id });
    return data;
};

export const deleteTask = async (id) => {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
};