import axios from "axios";

const API_URL = "/api/tasks";

export const getTasks = async (page = 1, limit = 10) => {
    // response = { first, prev, next, last, pages, items, data: Task[] }
    const { data: response } = await axios.get(`${API_URL}?_page=${page}&_per_page=${limit}`);
    // Map MongoDB's _id to id so existing UI logic continues working
    const tasks = response.data.map(task => ({ ...task, id: task._id || task.id }));
    // Return full pagination object so useInfiniteQuery's getNextPageParam (lastPage.next)
    // and page.js's page.data both continue to work without changes
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