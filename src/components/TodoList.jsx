import { useToast } from "../hooks/useToast";
import { useTodos } from "../hooks/useTodos";
import TodoForm from "./Todoform";
import TodoItem from "./TodoItem";
import PageController from "./ui/PageController";
import RecordController from "./ui/RecordController";
import StatusFilter from "./ui/StatusFilter";
import Toast from "./ui/Toast";

const TodoList = () => {
  const { toast, showToast } = useToast();
  const { todos, deleteTodo , updateStatus, editTodo, loading,  addTodo, startEdit ,
     editingId, filterStatus, setFilterStatus , page ,limit ,setPage ,setLimit ,totalPages
  } = useTodos(showToast);

  
  return (
 <>
  <Toast message={toast?.message} type={toast?.type} />
  <TodoForm onAdd={addTodo} />
  <div className="flex items-center justify-between mb-3 mt-2 ">
    <StatusFilter
      value={filterStatus}
      onChange={setFilterStatus}
    />

    <RecordController limit={limit} setLimit={setLimit} setPage={setPage}/>
  </div>

  {loading ? (
    <p className="text-center text-gray-500">Loading...</p>
  ) : (
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
        />
      ))}
    </div>
  )}

 <PageController page={page} setPage={setPage} totalPages={totalPages} />
  
</>
  );
};

export default TodoList;