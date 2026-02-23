import { useToast } from "../hooks/useToast";
import { useTodos } from "../hooks/useTodos";
import TodoForm from "./Todoform";
import TodoItem from "./TodoItem";
import BookmarkToggle from "./ui/BookmarkToggle";
import PageController from "./ui/PageController";
import RecordController from "./ui/RecordController";
import Searchbox from "./ui/Searchbox";
import StatusFilter from "./ui/StatusFilter";
import Toast from "./ui/Toast";
import { LayoutPanelLeft, List as ListIcon } from "lucide-react";
import KanbanView from "./KanbanView";
import { useState, useEffect } from "react";

const TodoList = () => {
  const { toast, showToast } = useToast();
  const [viewMode, setViewMode] = useState("list");
  const { todos, deleteTodo , updateStatus, editTodo, loading,  addTodo, startEdit ,
     editingId, filterStatus, setFilterStatus , page ,limit ,setPage ,setLimit ,totalPages , search ,setSearch , showBookmarked ,setShowBookmarked ,toggleBookmark ,fetchTodos , updateRating
  } = useTodos(showToast);

  useEffect(() => {
    if (viewMode === "kanban") {
      setLimit(1000);
      setPage(1);
    } else {
      setLimit(4);
    }
  }, [viewMode, setLimit, setPage]);

  return (
    <>
      <Toast message={toast?.message} type={toast?.type} />
      <TodoForm onAdd={addTodo} />
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex-1">
          <Searchbox search={search} setPage={setPage} setSearch={setSearch} />
        </div>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200 shadow-sm">
          <button onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            title="List View" >
            <ListIcon size={18} />
          </button>
          <button onClick={() => setViewMode("kanban")}
            className={`p-1.5 rounded-md transition-all ${viewMode === "kanban" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            title="Kanban View" >
            <LayoutPanelLeft size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 mt-2 ">
        <StatusFilter value={filterStatus} onChange={setFilterStatus} />

        <div className="flex flex-row gap-4 items-center">
          <BookmarkToggle
            setPage={setPage}
            setShowBookmarked={setShowBookmarked}
            showBookmarked={showBookmarked} />
          <RecordController
            limit={limit}
            setLimit={setLimit}
            setPage={setPage} />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading Todos...</p>
      ) : todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-lg font-semibold tracking-wide">No Todo Found</p>
<p className="text-sm">Try adjusting your search or filters</p>
        </div>
      ) : viewMode === "list" ? (
        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onStatusChange={updateStatus}
              onEdit={editTodo}
              onStartEdit={startEdit}
              editingId={editingId}
              onToggleBookmark={toggleBookmark}
              onRefresh={fetchTodos}
              updateRating={updateRating}
            />
          ))}
        </div>
      ) : (
        <KanbanView todos={todos} onStatusChange={updateStatus} />
      )}

      {viewMode === "list" && (
        <PageController page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </>
  );
};

export default TodoList;
