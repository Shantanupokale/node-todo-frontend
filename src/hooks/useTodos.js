import { useCallback, useEffect, useState } from "react";
import { TodoService } from "../services/TodoService";

export const useTodos = (showToast) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);


  const fetchTodos = useCallback(async () => {
  try {
    const response = await TodoService.getTodos(page, limit);
    setTodos(response.data);
    setTotalPages(response.pagination.totalPages);
  } catch (err) {
    console.error(err.message);
    setTodos([]);
  } finally {
    setLoading(false);
  }
},[page, limit]);


  const filteredTodos = !filterStatus
  ? todos
  : todos.filter((todo) => todo.status === filterStatus);
  
  useEffect(() => {
    fetchTodos();
  }, [page,limit]);

  const addTodo = async (title, description) => {
    if (!title || !description) return;

    const created = await TodoService.createTodo({
      title,
      description,
      status: "in-progress",
    });

  //setTodos((prev) => [...prev, created]);
  fetchTodos();
  showToast("Todo created successfully", "success");
  };

  const deleteTodo = async (id) => {
    await TodoService.deleteTodo(id);
    //setTodos((prev) => prev.filter((t) => t.id !== id));
    fetchTodos();
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
    setFilterStatus,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
  };
};