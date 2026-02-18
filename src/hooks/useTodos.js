import { useEffect, useState } from "react";
import { TodoService } from "../services/TodoService";

export const useTodos = (showToast) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const fetchTodos = async () => {
    try {
      const data = await TodoService.getTodos();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err.message);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };


  const filteredTodos =
  filterStatus === "all"
    ? todos
    : todos.filter((todo) => todo.status === filterStatus);

  
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title, description) => {
    if (!title || !description) return;

    const created = await TodoService.createTodo({
      title,
      description,
      status: "in-progress",
    });

    setTodos((prev) => [...prev, created]);
    showToast("Todo created successfully", "success");
  };

  const deleteTodo = async (id) => {
    await TodoService.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    showToast("Todo deleted successfully", "error");
  };

  const updateStatus = async (id, status) => {
    const existing = todos.find((t) => t.id === id);
    if (!existing) return;

    const updated = await TodoService.updateTodo(id, {
      title: existing.title,
      description: existing.description,
      status,
    });

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );

    showToast("Todo updated", "info");
  };

  const startEdit = (id) => {
  setEditingId(id);
};

 const editTodo = async (id, newTitle, newDescription) => {
  const existing = todos.find((t) => t.id === id);
  if (!existing) return;

  const updated = await TodoService.updateTodo(id, {
    title: newTitle,
    description: newDescription,
    status: existing.status,
  });

  setTodos((prev) =>
    prev.map((t) => (t.id === id ? updated : t))
  );

  setEditingId(null);
  showToast("Todo updated successfully", "info");
};

  return {
    todos: filteredTodos,
    loading,
    addTodo,
    deleteTodo,
    updateStatus,
    editTodo,
    startEdit,
    editingId,
    filterStatus,
  setFilterStatus
  };
};