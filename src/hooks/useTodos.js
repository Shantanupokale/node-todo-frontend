import { useCallback, useEffect, useState } from "react";
import { TodoService } from "../services/TodoService";
import { useSearch } from "./useSearch";

export const useTodos = (showToast) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  // const [search, setSearch] = useState("");
  const { search, setSearch, debouncedSearch } = useSearch(500);
  const [showBookmarked, setShowBookmarked] = useState(false);


const fetchTodos = useCallback(async () => {
  try {
    const response = await TodoService.getTodos(page, limit, debouncedSearch , showBookmarked ,filterStatus);
    const todosWithFloatRating = response.data.map(todo => ({
      ...todo,
      rating: parseFloat(todo.rating ?? 0),
    }));
    setTodos(todosWithFloatRating);
    setTotalPages(response.pagination.totalPages);
  } catch (err) {
    console.error(err.message);
    setTodos([]);
  } finally {
    setLoading(false);
  }
},[page, limit ,debouncedSearch , showBookmarked , filterStatus]);

  const filteredTodos = !filterStatus
    ? todos
    : todos.filter((todo) => todo.status === filterStatus);

  useEffect(() => {
    fetchTodos();
  }, [page, limit, debouncedSearch, showBookmarked , filterStatus]);

  const addTodo = async (title, description, categoryId) => {
    try {
      await TodoService.createTodo({
        title,
        description,
        category_id: categoryId || null,
      });

      fetchTodos();
      showToast("Todo created successfully", "success");
    } catch (err) {
      console.error(err.message);
    }
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

    // setTodos((prev) =>
    //   prev.map((t) => (t.id === id ? updated : t))
    // );

    fetchTodos();
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

    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));

    setEditingId(null);
    showToast("Todo updated successfully", "info");
  };

  const toggleBookmark = async (id) => {
  try {
    await TodoService.toggleBookmark(id);
    fetchTodos();  
    showToast("Bookmark updated", "info");
  } catch (err) {
    console.error(err.message);
  }
};

const updateRating = async (id, rating) => {
    try {
      await TodoService.updateRating(id, rating);
      fetchTodos();
      showToast("Rating updated", "success");
    } catch (err) {
      console.error(err.message);
    }
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
    search,
    setSearch,
    showBookmarked,
    setShowBookmarked,
    toggleBookmark,
    fetchTodos,
    updateRating
  };
};