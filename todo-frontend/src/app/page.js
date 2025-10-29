'use client';

import { useEffect, useState } from 'react';

const API_BASE = "https://flask-todo-cicd-production-df63.up.railway.app/api";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    checkHealth();
    loadTodos();
  }, []);

  const checkHealth = async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error('API not healthy');
      setApiStatus('healthy');
    } catch (err) {
      setApiStatus('unhealthy');
      setError('Cannot connect to API. Please check backend.');
    }
  };

  const loadTodos = async () => {
  try {
    setLoading(true);
    const res = await fetch(`${API_BASE}/todos`);
    const data = await res.json();

    // ✅ ตรวจว่า data.data มีไหม ถ้ามีก็ใช้ data.data แทน
    setTodos(Array.isArray(data.data) ? data.data : []);
  } catch (err) {
    console.error('Load todos error:', err);
    setError('Failed to load todos.');
  } finally {
    setLoading(false);
  }
};

  const handleAdd = async () => {
    const value = document.getElementById('newTodo').value.trim();
    if (!value) return;
    try {
      await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: value })
      });
      document.getElementById('newTodo').value = '';
      loadTodos();
    } catch {
      alert('Add failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' });
      loadTodos();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-purple-600 mb-6">
          ✨ My Todo List 📝
        </h1>

        {/* API status */}
        <div className="mb-4">
          <span className={`font-medium ${apiStatus === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
            {apiStatus === 'healthy' ? '🟢 API Connected' : '🔴 API Disconnected'}
          </span>
        </div>

        {/* Error */}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Add input */}
        <div className="flex justify-center mb-6">
          <input
            id="newTodo"
            className="border px-3 py-2 rounded-l-lg w-2/3"
            placeholder="Add a new todo..."
          />
          <button
            onClick={handleAdd}
            className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
          >
            Add
          </button>
        </div>

        {/* Todo list */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <ul className="bg-white rounded-lg shadow p-4 space-y-3">
            {todos.map((todo) => (
              <li key={todo.id} className="flex justify-between items-center">
                <span>{todo.title}</span>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑 Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
