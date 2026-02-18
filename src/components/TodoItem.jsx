import { useState } from "react";
import { Trash2 , Pencil} from "lucide-react";
import Modal from "./ui/Modal";
import { STATUS, statusStyles } from "../constants/statusStyles";

const TodoItem = ({ todo, onDelete, onStatusChange , onEdit , onStartEdit , editingId }) => {
const [isModalOpen, setIsModalOpen] = useState(false);
const [editedTitle, setEditedTitle] = useState(todo.title);
const [editedDescription, setEditedDescription] = useState(todo.description);
const isEditing = editingId === todo.id;

  const handleDeleteConfirm = () => {
    onDelete(todo.id);
    setIsModalOpen(false);
  };

  const handleSave = () => {
  if (!editedTitle.trim() || !editedDescription.trim()) return;
  onEdit(todo.id, editedTitle.trim(), editedDescription.trim());
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleSave();
  }
}

  return (
    <>
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center gap-3">
        <input
              type="checkbox"
              className="mt-2 cursor-pointer"
            />
        {isEditing ? (
          <div className=" gap-3 flex  ">
            <div className="flex flex-col gap-3">
  
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="px-2 py-1 rounded border border-gray-300 outline-none"
              /> 

              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                className="px-2 py-1 rounded border border-gray-300 outline-none text-sm"
                />
            </div>
            
        <div className="flex flex-col gap-4">
            <button onClick={handleSave}  className="px-2 py-1 text-sm bg-blue-400 text-white rounded hover:bg-blue-600" >
                Save
              </button>
             <button onClick={() => onStartEdit(null)}  className="px-3 py-1 text-sm border rounded">
                  Cancel
             </button>
          </div>
      </div>
            ) : (
          <span
            className={`text-lg ${
              todo.status === "complete"
                ? "line-through text-gray-400"
                : ""}`}>
            {todo.title}
            <div className="text-sm text-gray-400">
              {todo.description}
            </div>
          </span>
          )}
        </div>

        <div className="flex items-center gap-3 ">
          <select
          value={todo.status}
          onChange={(e) => onStatusChange(todo.id, e.target.value)}
          className={`px-3 py-2 rounded-md border text-sm  font-medium transition outline-none ${statusStyles[todo.status]}`} >
          <option value={STATUS.IN_PROGRESS}>in-progress</option>
          <option value={STATUS.ON_HOLD}>on-hold</option>
          <option value={STATUS.COMPLETE}>complete</option>

          </select>

        <button  onClick={() => onStartEdit(todo.id)} className="text-gray-600 hover:text-blue-500">
            <Pencil size={18} />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-600 hover:text-red-500 ">
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