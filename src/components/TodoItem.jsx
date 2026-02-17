import { useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "./ui/Modal";

const TodoItem = ({ todo, onDelete, onStatusChange }) => {
const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(todo.id);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center gap-3">
        <input type="checkbox" checked={todo.status === "complete"}
            onChange={(e) =>
              onStatusChange(
                todo.id,e.target.checked ? "complete" : "in-progress"
              )}/>
          <span
            className={`text-lg ${
              todo.status === "complete"
                ? "line-through text-gray-400"
                : ""}`}>
            {todo.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <select
          value={todo.status}
          onChange={(e) => onStatusChange(todo.id, e.target.value)}
          className="px-3 py-1 rounded-md border border-gray-300 text-sm">
          <option value="in-progress">in-progress</option>
          <option value="complete">complete</option>
          <option value="on-hold">on-hold</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-600 hover:text-red-500">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        title="Delete Todo" onConfirm={handleDeleteConfirm}
        confirmText="Yes, Delete"  
        cancelText="Cancel" >
        Are you sure you want to delete this todo?
      </Modal>
    </>
  );
};

export default TodoItem;