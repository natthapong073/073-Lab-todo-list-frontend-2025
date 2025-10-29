import axios from 'axios';

// ตรวจสอบ API URL - ต้องไม่มี trailing slash
const API_BASE_URL = "https://flask-todo-cicd-production-df63.up.railway.app/api";

console.log('API_URL:', API_URL); // ← เพิ่ม log เพื่อ debug

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Error interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error); // ← เพิ่ม detailed error
    return Promise.reject(error);
  }
);

export const todoAPI = {
  getTodos: async () => {
    try {
      const response = await api.get('/todos');
      return response.data;
    } catch (error) {
      console.error('getTodos error:', error);
      throw error;
    }
  },

  createTodo: async (todo) => {
    try {
      const response = await api.post('/todos', todo);
      return response.data;
    } catch (error) {
      console.error('createTodo error:', error);
      throw error;
    }
  },

  updateTodo: async (id, updates) => {
    try {
      const response = await api.put(`/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('updateTodo error:', error);
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error('deleteTodo error:', error);
      throw error;
    }
  },

  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('healthCheck error:', error);
      throw error;
    }
  },
};

export default api;
