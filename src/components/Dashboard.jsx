import TodoList from "./TodoList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-12">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8 ">
        <h1 className="text-3xl font-bold text-center mb-4">📝 TODO</h1>
        <TodoList />
      </div>
    </div>
  );
};

export default Dashboard;