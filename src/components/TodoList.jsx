import React, { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React", status: "in-progress", checked: true },
    { id: 2, title: "Learn Node", status: "completed", checked: false },
    { id: 3, title: "Learn JavaScript Programming", status: "on-hold", checked: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTodo = () => {
    if (!newTask.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: newTask,
        status: "in-progress",
        checked: false,
      },
    ]);

    setNewTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Learn coding"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTodo}
          className="bg-black text-white px-5 rounded-lg text-xl hover:bg-gray-800"
        >
          +
        </button>
      </div>


      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;