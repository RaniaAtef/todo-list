import axios from "axios";

const API_URL = "http://localhost:4000/tasks";

export const getTasks = async (page = 1, limit = 10) => {
    const { data } = await axios.get(`${API_URL}?_page=${page}&_per_page=${limit}`);
    return data;
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