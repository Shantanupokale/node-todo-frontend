import { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    onAdd(title.trim(), description.trim());
    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex flex-row gap-3 mb-2 max-h-12">
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300"
      />

      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300"
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
      >
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;