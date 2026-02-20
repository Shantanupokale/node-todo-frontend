import { Trash2 } from "lucide-react";
import { STATUS, statusStyles } from "../constants/statusStyles";

const SubtaskItem = ({ subtask, onStatusChange, onDelete }) => {
  const handleStatusUpdate = (newStatus) => {
    onStatusChange(subtask.id, {
      title: subtask.title,
      description: subtask.description,
      status: newStatus,
    });
  };

  const handleToggle = () => {
    const nextStatus =
      subtask.status === STATUS.COMPLETE ? STATUS.IN_PROGRESS : STATUS.COMPLETE;
    handleStatusUpdate(nextStatus);
  };

  return (
    <div className="flex items-center justify-between  bg-gray-100 p-2 rounded gap-1 text-sm">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={subtask.status === STATUS.COMPLETE}
          onChange={handleToggle}
          className="cursor-pointer"
        />
        <div className="flex flex-col">
          <span
            className={
              subtask.status === STATUS.COMPLETE
                ? "line-through text-gray-400"
                : "text-gray-700"
            }
          >
            {subtask.title}
          </span>
          {subtask.description && (
            <span className="text-[10px] text-gray-400">
              {subtask.description}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={subtask.status}
          onChange={(e) => handleStatusUpdate(e.target.value)}
          className={`px-1 py-0.5 rounded text-[10px] border outline-none ${statusStyles[subtask.status]}`}
        >
          <option value={STATUS.IN_PROGRESS}>in-progress</option>
          <option value={STATUS.ON_HOLD}>on-hold</option>
          <option value={STATUS.COMPLETE}>complete</option>
        </select>

        <button
          onClick={() => onDelete(subtask.id)}
          className="text-red-500 p-1"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default SubtaskItem;
