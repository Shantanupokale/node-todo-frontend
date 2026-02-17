import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { TodoService } from "../services/TodoService";
import Toast from "./ui/Toast";
import { useToast } from "../hooks/useToast";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast, showToast } = useToast();

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

useEffect(() => {
    fetchTodos();
  }, []);


 const addTodo = async () => {
    if (!title.trim() || !description.trim()) return;

try {
    const created = await TodoService.createTodo({
        title: title.trim(),
        description: description.trim(),
        status: "in-progress",
   });
      setTodos((prev) => [...prev, created]);
      showToast("Todo created successfully", "success");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };


 const deleteTodo = async (id) => {
  try {
      await TodoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      showToast("Todo deleted successfully","error")
    } catch (err) {
      console.error(err.message);
    }
  };

  // update status
  const updateStatus = async (id, status) => {
    const existing = todos.find((t) => t.id === id);
    if (!existing) return;
try {
    const updated = await TodoService.updateTodo(id, {
        title: existing.title,
        description: existing.description,
        status,
   });
      setTodos((prev) =>
        prev.map((todo) =>  todo.id === id ? updated : todo)
      );
      showToast("Todo updated", "info");
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <Toast message={toast?.message} type={toast?.type} />

    <div className="flex flex-row gap-3 mb-6 max-h-12">
     <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

     <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
       />

        <button 
          onClick={addTodo} 
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 text-md text-nowrap"
          >
          Add Todo
   </button>
</div>

  {/* todplist */}
  <div className="space-y-4">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id} 
        todo={todo}
        onDelete={deleteTodo}
        onStatusChange={updateStatus}
      />
    ))}
  </div>
    </>
  );
};

export default TodoList;