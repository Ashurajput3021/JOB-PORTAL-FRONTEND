import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { LogIn, UserPlus, LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Logout Handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-white hover:text-yellow-300 transition transform hover:scale-110 hover:brightness-125">
          Job<span className="text-yellow-300">Portal</span>
        </h1>

        {/* Menu + Auth */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 text-white">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-yellow-300 transition transform hover:scale-110">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-yellow-300 transition transform hover:scale-110">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-yellow-300 transition transform hover:scale-110">Home</Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-yellow-300 transition transform hover:scale-110">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-yellow-300 transition transform hover:scale-110">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg shadow-lg hover:bg-purple-50 hover:brightness-110 transition transform hover:scale-110">
                  <LogIn size={18} /> Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-xl hover:brightness-125 transition transform hover:scale-110">
                  <UserPlus size={18} /> Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white cursor-pointer hover:ring-yellow-300 transition transform hover:scale-110">
                  <img
                    src={user?.profile?.profilePhoto || ""}
                    alt="Profile Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 mt-2 bg-white rounded-lg shadow-xl focus:outline-none">
                <div className="flex items-center gap-4 mb-2">
                  {/* Circle with fixed size */}
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-gray-300 flex items-center justify-center bg-gray-100">
                    <img
                      src={user?.profile?.profilePhoto || ""}
                      alt="Profile Photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <h4 className="font-semibold text-sm truncate">{user.fullname || "User"}</h4>
                    <p className="text-xs text-gray-500 truncate">{user.email || "Welcome Back!"}</p>
                  </div>
                </div>

                <div className="flex flex-col text-gray-600 gap-2">
                  {user && user.role === "student" && (
                    <Link to="/profile">
                      <Button
                        variant="link"
                        className="p-0 cursor-pointer hover:text-purple-600 transition flex items-center gap-2"
                      >
                        <User2 size={18} /> View Profile
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="link"
                    onClick={logoutHandler}
                    className="p-0 cursor-pointer mr-32 hover:text-purple-600 transition flex items-center gap-2"
                  >
                    <LogOut size={18} /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
