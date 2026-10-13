import React from "react";
import { Link, useNavigate } from "react-router";
import { LogOutIcon, PlusIcon } from "lucide-react";
import toast from "react-hot-toast";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isConnected");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          {/* Left */}
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>

          {/* Right */}
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="btn btn-primary flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Note</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-ghost btn-square"
              aria-label="Logout"
              title="Logout"
            >
              <LogOutIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
