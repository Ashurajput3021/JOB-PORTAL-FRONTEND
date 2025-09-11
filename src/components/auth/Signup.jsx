import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { setLoading } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Navbar from "../shared/Navbar";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profilePhoto: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const changeFileHandler = (e) =>
    setInput({ ...input, profilePhoto: e.target.files[0] });

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (input[key]) formData.append(key, input[key]);
    });

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 flex flex-col relative">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12 relative z-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-[430px] bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 space-y-4"
        >
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-900">
            Sign Up
          </h1>

          {/* Fullname, Email, Phone */}
          {["fullname", "email", "phoneNumber"].map((field, i) => (
            <div className="my-1" key={i}>
              <label className="block font-medium text-gray-800 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                value={input[field]}
                name={field}
                onChange={changeEventHandler}
                placeholder={`Enter your ${field}`}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-sm"
              />
            </div>
          ))}

          {/* Password */}
          <div className="my-1 relative">
            <label className="block font-medium text-gray-800 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-sm"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Role */}
          <div className="flex items-center gap-4">
            {["student", "recruiter"].map((role) => (
              <label
                key={role}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer border ${
                  input.role === role
                    ? "bg-purple-100 border-purple-400 text-purple-700 font-medium"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={input.role === role}
                  onChange={changeEventHandler}
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>

          {/* Profile Photo */}
          <div className="my-2">
            <label className="block font-medium text-gray-800 mb-1">
              Profile Photo (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer text-sm"
            />
          </div>

          {/* Button */}
          {loading ? (
            <Button className="w-full flex justify-center items-center gap-2 bg-purple-500 text-white">
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-purple-500 text-white cursor-pointer hover:bg-purple-600"
            >
              Signup
            </Button>
          )}

          <p className="text-center text-xs mt-2 text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="cursor-pointer text-purple-600 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
