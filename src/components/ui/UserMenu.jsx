import { LogOut, User } from "lucide-react";
import { useState } from "react";

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="flex items-center text-sm gap-2 px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300" >
         <User size={12}/>
         {user?.username || "User"}
      </button>

      {open && (
        <div className="absolute right-0   bg-red-500 text-white border rounded shadow-md">
          <button onClick={handleLogout}
            className="block w-full text-left p-1 text-sm " >
            <LogOut size={16}/>
           
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
