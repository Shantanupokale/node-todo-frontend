import { useRef } from "react";
import { STATUS } from "../constants/statusStyles";

const KanbanView = ({ todos, onStatusChange }) => {
  const dragItem = useRef(null);

  const handleDragStart = (id) => {
    dragItem.current = id;
  };

  const handleDrop = (targetStatus) => {
    const id = dragItem.current;
    if (!id) return;

    const draggedTodo = todos.find((t) => t.id === id);
    if (draggedTodo && draggedTodo.status !== targetStatus) {
      onStatusChange(id, targetStatus);
    }
    dragItem.current = null;
  };

  const columns = [
    {
      id: STATUS.IN_PROGRESS,
      title: "In Progress",
      cardBg: "bg-yellow-200",
    },
    {
      id: STATUS.ON_HOLD,
      title: "On Hold",
      cardBg: "bg-gray-200",
    },
    {
      id: STATUS.COMPLETE,
      title: "Completed",
      cardBg: "bg-green-200",
    },
  ];

  return (
    <div className="flex gap-3 min-h-[450px] overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnTodos = todos.filter(
          (todo) => todo.status === column.id
        );

    return (
      <div
        key={column.id}
        className="flex-1 min-w-[210px] rounded-lg border p-3 flex flex-col gap-3"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(column.id)} >
        <h2 className="text-center font-bold text-gray-500 uppercase text-[9px] tracking-widest">
          {column.title}
        </h2>

        {columnTodos.map((todo) => (
          <div
            key={todo.id}
            draggable
            onDragStart={() => handleDragStart(todo.id)}
            className={`${column.cardBg} p-3 rounded-md border shadow-sm hover:shadow-md transition cursor-grab`}>
            <h3 className="font-semibold text-[11px] text-gray-800 mb-1">
              {todo.title}
            </h3>
            <p className="text-[10px] text-gray-500 line-clamp-2">
              {todo.description}
            </p>
            {todo.category_name && (
              <span className="mt-2 inline-block text-[9px] bg-white/60 text-gray-600 px-1.5 py-0.5 rounded uppercase font-bold border italic">
                {todo.category_name}
              </span>
            )}
          </div>
        ))}
      </div>
    );
      })}
    </div>
  );
};

export default KanbanView;