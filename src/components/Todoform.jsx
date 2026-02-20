import { useState, useEffect } from "react";
import { CategoryService } from "../services/CategoryService";
import Modal from "./ui/Modal";

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");

  const loadCategories = async () => {
    try {
      const response = await CategoryService.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (!newName.trim() || !newDisplayName.trim()) return;

    try {
      const response = await CategoryService.createCategory({
        name: newName.trim(),
        display_name: newDisplayName.trim(),
      });
      const created = response.data;
      setCategories((prev) => [...prev, created]);
      setCategoryId(created.id);
      setNewName("");
      setNewDisplayName("");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    onAdd(title.trim(), description.trim(), categoryId || null);

    setTitle("");
    setDescription("");
    setCategoryId("");
  };

  return (
    <>
    <div className="flex flex-row gap-3 mb-2 max-h-10">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-1 rounded-lg border"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-1 rounded-lg border"
        />

        <select
          value={categoryId}
          onChange={(e) => {
            if (e.target.value === "create-new") {
              setIsModalOpen(true);
            } else {
              setCategoryId(e.target.value);
            }
          }}
          className="px-2 py-1 border rounded-md text-[11px] bg-gray-900 text-white">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.display_name}
            </option>
          ))}
          <option value="create-new" > + New Category</option>
        </select>

        <button
          onClick={handleSubmit}
          className="px-2 py-1 border rounded-md text-[11px] bg-gray-900 text-white"
        >
          Add Todo
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Category"
        onConfirm={handleCreateCategory}
        confirmText="Create"
        cancelText="Cancel" >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Category name (slug)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Display name"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>
      </Modal>
    </>
  );
};

export default TodoForm;