const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/todos`;

const getTodos = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");

  const json = await res.json();
  return json.data; 
};

const getTodoById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch todo");

  const json = await res.json();
  return json.data;
};

const createTodo = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create todo");

  const json = await res.json();
  return json.data; 
};

const updateTodo = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update todo");

  const json = await res.json();
  return json.data;
};

const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete todo");

  const json = await res.json();
  return json.data;
};

export const TodoService = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};