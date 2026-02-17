import { Pencil, Trash2 } from "lucide-react";

const TodoItem = ({ todo, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
    
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={todo.checked} readOnly />
        <span
          className={`text-lg ${
            todo.status === "completed"
              ? "line-through text-gray-400"
              : ""
          }`}
        >
          {todo.title}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={todo.status}
          className="px-3 py-1 rounded-md border border-gray-300 text-sm"
          readOnly
        >
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
          <option value="on-hold">on-hold</option>
        </select>

        <button className="text-gray-600 hover:text-black">
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-600 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;