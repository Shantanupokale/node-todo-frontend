import { useState } from "react";
import { Trash2 , Pencil, Heart ,ChevronUp , ListPlus } from "lucide-react";
import Modal from "./ui/Modal";
import { STATUS, statusStyles } from "../constants/statusStyles";
import SubtaskPanel from "./SubtaskPanel";

const TodoItem = ({ todo, onDelete, onStatusChange , onEdit , onStartEdit , editingId , onToggleBookmark, onRefresh}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);
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
  };

  const handleSubtaskComplete = () => {
    if (todo.status !== "complete") {
      onStatusChange(todo.id, "complete");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg gap-3 ">
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
                  className="px-2 py-1 rounded border border-gray-300 outline-none text-sm"
                />

                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="px-2 py-1 rounded border border-gray-300 outline-none text-xs"
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
                  ? "line-through text-gray-400 text-sm"
                : ""}`}>
              {todo.title}
            <div className=" text-gray-400 text-xs">
              {todo.description}
            </div>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 ">
          {todo.category_name && (
            <span className="text-[11px] bg-blue-100 text-blue-600 px-2 py-1 uppercase italic rounded">
              {todo.category_name}
            </span>
          )}
          <select value={todo.status} onChange={(e) => onStatusChange(todo.id, e.target.value)}
            className={`p-2 rounded-md border text-[11px]  font-medium transition outline-none ${statusStyles[todo.status]}`} >
            <option value={STATUS.IN_PROGRESS}>IN-PROGRESS</option>
            <option value={STATUS.ON_HOLD}>ON-HOLD</option>
            <option value={STATUS.COMPLETE}>COMPLETE</option>
          </select>

          <button onClick={() => onStartEdit(todo.id)} className="text-gray-600 hover:text-blue-500">
            <Pencil size={18} />
          </button>

          <button onClick={() => setIsModalOpen(true)}  className="text-gray-600 hover:text-red-500 ">
            <Trash2 size={18} />
          </button>
          <button onClick={() => onToggleBookmark(todo.id)}>
            {todo.bookmarked ? (
              <Heart fill="red" color="red" size={18} />
            ) : (
              <Heart size={18} />
            )}
          </button>

          <button  onClick={() => setShowSubtasks(!showSubtasks)}
            className={`p-1 rounded-full transition-colors ${showSubtasks ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-200"}`}
            title="Subtasks" >
            {showSubtasks ? <ChevronUp size={20} /> : <ListPlus size={20} />}
          </button>
        </div>
      </div>

 {showSubtasks && (
        <SubtaskPanel todoId={todo.id} onSubtaskComplete={handleSubtaskComplete} />
      )}

  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        title="Delete Todo" onConfirm={handleDeleteConfirm}
        confirmText="Yes, Delete"
        cancelText="Cancel" >
        Are you sure you want to delete this todo
        <span className="font-semibold text-gray-900">
      " {todo.title} "
    </span> ?
      </Modal>
</div>
  );
};

export default TodoItem;