import { useToast } from "../hooks/useToast";
import { useTodos } from "../hooks/useTodos";
import TodoForm from "./Todoform";
import TodoItem from "./TodoItem";
import Toast from "./ui/Toast";

const TodoList = () => {
  const { toast, showToast } = useToast();
  const { todos, deleteTodo , updateStatus, editTodo, loading,  addTodo, startEdit , editingId} = useTodos(showToast);

  
  return (
   <>
      <Toast message={toast?.message} type={toast?.type} />

      <TodoForm onAdd={addTodo} />
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