import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans flex flex-col relative overflow-hidden">
      <nav className="w-full max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-md font-bold text-sm">
            TB
          </div>
          <span className="text-lg font-semibold tracking-tight">
            TodoBuddy
          </span>
        </div>

        <Link to="/login"
          className="text-sm font-medium border border-black px-5 py-2 rounded-md hover:bg-black hover:text-white transition">
          Sign In
        </Link>
      </nav>

      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6">
        <div className="flex flex-row items-center justify-between gap-12 mt-20">
          <div className="flex-1 text-left">
            <h1 className="text-7xl font-semibold tracking-tight leading-[1.1]">
              Your all-in-one <br />
              <span className="italic font-medium">to-do platform</span>
            </h1>
            <p className="mt-8 text-gray-500 max-w-xl text-lg leading-relaxed">
              Managing tasks is already challenging enough. Avoid further
              complications by ditching outdated To-Do apps.
            </p>
          </div>

          <div className="flex-1 w-full max-w-2xl ">
            <div className="relative group">
              <img src="https://www.overflow.design/src/assets/img/nc/to-do-list.jpg"
                alt="To-do list illustration"
                className="w-full h-auto rounded-2xl transition-transform duration-500 "
              />
            </div>
          </div>
        </div>

 
        <div className="mt-8 flex justify-center ">
          <Link to="/register"
            className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded-md font-medium hover:bg-white hover:text-black border border-transparent hover:border-black transition-all shadow-xl hover:shadow-2xl">
            Start for free
            <Star className="w-5 h-5 fill-white group-hover:fill-black" />
          </Link>
        </div>
      </main>

      <footer className="py-8 flex items-center justify-center gap-1.5 text-gray-400 text-[11px] font-medium tracking-tight">
        <span>Made with</span>
        <Heart size={10} className="fill-red-400 text-red-400" />
        <span>by</span>
        <a
          href="https://github.com/Shantanupokale/node-todo-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:underline underline-offset-2"
        >
          shantanu
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
