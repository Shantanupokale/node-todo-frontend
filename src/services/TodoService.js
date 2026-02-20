const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/todos`;

const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
});

const getTodos = async (page = 1, limit = 5, search = "" , bookmarked = false) => {

  let url = `${BASE_URL}?page=${page}&limit=${limit}`;
  if (search) { url = url + `&search=${search}`;}
  if (bookmarked) { url = url + `&bookmarked=true`; }

  const res = await fetch(url , {
    headers: authHeaders(),
   });
  if (!res.ok) throw new Error("Failed to fetch todos");

  return await res.json();
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
    headers: authHeaders() ,
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create todo");

  const json = await res.json();
  return json.data; 
};

const updateTodo = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders() ,
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update todo");

  const json = await res.json();
  return json.data;
};

const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders() ,
  });

  if (!res.ok) throw new Error("Failed to delete todo");

  const json = await res.json();
  return json.data;
};

const toggleBookmark = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/bookmark`, {
    method: "PATCH",
    headers: authHeaders() ,
  });

  if (!res.ok) throw new Error("Failed to toggle bookmark");

  return await res.json();
};

export const TodoService = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleBookmark
};