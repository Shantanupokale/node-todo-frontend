import { useEffect, useState } from "react";
import { SubtaskService } from "../services/SubtaskService";
import SubtaskItem from "./SubtaskItem";

const SubtaskPanel = ({ todoId }) => {
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchSubtasks();
  }, [todoId]);

  const fetchSubtasks = async () => {
    try {
      setLoading(true);
      const data = await SubtaskService.getSubtasks(todoId);
      setSubtasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubtask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const newSubtask = await SubtaskService.createSubtask({
        todo_id: todoId,
        title: newTitle.trim(),
        description: "",
      });
      setSubtasks([...subtasks, newSubtask]);
      setNewTitle("");
      setIsAdding(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id, updatedData) => {
    try {
      const updatedSubtask = await SubtaskService.updateSubtask(
        id,
        updatedData,
      );
      setSubtasks(subtasks.map((st) => (st.id === id ? updatedSubtask : st)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await SubtaskService.deleteSubtask(id);
      setSubtasks(subtasks.filter((st) => st.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-2 ml-8 border-l pl-4 py-2">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase">
          Subtasks
        </h4>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="text-blue-500 text-xs" >
            + Add Subtask
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-gray-400 italic text-xs">loading...</div>
      ) : (
        <div className="flex flex-col gap-2">
          {subtasks.length === 0 && !isAdding && (
            <p className="text-xs text-gray-400">No subtasks.</p>
          )}

          {subtasks.map((st) => (
            <SubtaskItem
              key={st.id}
              subtask={st}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}

          {isAdding && (
            <form onSubmit={handleAddSubtask} className="flex gap-2">
              <input
                type="text"
                autoFocus
                placeholder="Add Subtask"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 text-sm px-2 py-1  rounded outline"
              />
             <button type="submit" className="text-[11px] bg-gray-800 text-white px-2 py-1 rounded">
                Add
              </button>
              <button type="button"  onClick={() => setIsAdding(false)} className="text-[11px] text-gray-500 outline px-1 rounded" >
                Cancel
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default SubtaskPanel;
