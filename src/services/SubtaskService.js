const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/subtasks`;

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const getSubtasks = async (todoId) => {
  const res = await fetch(`${BASE_URL}/${todoId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch subtasks");
  const json = await res.json();
  return json.data;
};

const createSubtask = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create subtask");
  const json = await res.json();
  return json.data;
};

const updateSubtask = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update subtask");
  const json = await res.json();
  return json.data;
};

const deleteSubtask = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete subtask");
  return await res.json();
};

export const SubtaskService = {
  getSubtasks,
  createSubtask,
  updateSubtask,
  deleteSubtask,
};
