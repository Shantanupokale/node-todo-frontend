import TodoList from "../components/TodoList";
import UserMenu from "../components/ui/UserMenu";


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-12">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8 m-4  ">
        <div className="flex flex-row text-center gap-3 pb-5 justify-between">
         <div className="flex flex-row gap-3">
           <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-md font-bold text-sm">
            TB
          </div>
          <span className="text-lg font-semibold tracking-tight">
            TodoBuddy
          </span>
         </div>

<UserMenu/>
        </div>
        <TodoList />
      </div>
    </div>
  );
};

export default Dashboard;