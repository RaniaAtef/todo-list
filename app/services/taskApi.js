import axios from "axios";

const API_URL = "/api/tasks";

export const getTasks = async (page = 1, limit = 10) => {
    // response = { first, prev, next, last, pages, items, data: [tasks] }
    const { data: response } = await axios.get(`${API_URL}?_page=${page}&_per_page=${limit}`);
    return response; // useInfiniteQuery stores this as a "page"; tasks are at page.data
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