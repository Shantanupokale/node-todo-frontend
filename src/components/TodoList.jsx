import { useToast } from "../hooks/useToast";
import { useTodos } from "../hooks/useTodos";
import TodoForm from "./Todoform";
import TodoItem from "./TodoItem";
import StatusFilter from "./ui/StatusFilter";
import Toast from "./ui/Toast";

const TodoList = () => {
  const { toast, showToast } = useToast();
  const { todos, deleteTodo , updateStatus, editTodo, loading,  addTodo, startEdit ,
     editingId, filterStatus, setFilterStatus
  } = useTodos(showToast);

  
  return (
   <>
      <Toast message={toast?.message} type={toast?.type} />

      <TodoForm onAdd={addTodo} />
      <div className="flex justify-end mb-4 " >
     <StatusFilter
        value={filterStatus}
        onChange={setFilterStatus}
      />
      </div>
  {loading ? (
        <p className="text-center">Loading...</p>
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
    </>
  );
};

export default TodoList;