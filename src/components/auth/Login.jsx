import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";  
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "student" });
  const { loading ,user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Moving stars
  const [stars, setStars] = useState(
    Array.from({ length: 25 }, () => ({
      top: Math.random() * window.innerHeight,
      left: Math.random() * window.innerWidth,
      size: Math.random() * 3 + 2,
      color: ["#FFD700","#FFFFFF","#00FFFF","#FF69B4"][Math.floor(Math.random() * 4)],
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.2,
    }))
  );

  // Moving bubbles
  const [bubbles, setBubbles] = useState(
    Array.from({ length: 15 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 40 + 20,
      color: ["#8A2BE2", "#00FFFF", "#FF69B4", "#FFD700"][Math.floor(Math.random() * 4)],
      speedX: (Math.random() - 0.5) * 0.1,
      speedY: (Math.random() - 0.5) * 0.05,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prev => prev.map(s => {
        let nx = s.left + s.speedX;
        let ny = s.top + s.speedY;
        if (nx < 0) nx = window.innerWidth;
        if (nx > window.innerWidth) nx = 0;
        if (ny < 0) ny = window.innerHeight;
        if (ny > window.innerHeight) ny = 0;
        return { ...s, left: nx, top: ny };
      }));
      setBubbles(prev => prev.map(b => {
        let nx = b.x + b.speedX;
        let ny = b.y + b.speedY;
        if (nx < -b.size) nx = window.innerWidth;
        if (nx > window.innerWidth) nx = -b.size;
        if (ny < -b.size) ny = window.innerHeight;
        if (ny > window.innerHeight) ny = -b.size;
        return { ...b, x: nx, y: ny };
      }));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    if (user) {
      navigate("/");
    }
  },[])
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-400 overflow-hidden">
      <Navbar />

      {/* Stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: `${s.top}px`,
            left: `${s.left}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            opacity: 0.9,
            filter: "blur(0px) drop-shadow(0 0 6px white)"
          }}
        />
      ))}

      {/* Bubbles */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: `${b.y}px`,
            left: `${b.x}px`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            backgroundColor: b.color,
            opacity: 0.3,
            filter: "blur(20px)"
          }}
        />
      ))}

      <div className="flex items-center justify-center px-5 py-20 relative z-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 space-y-4"
        >
          <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900">Login</h1>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1">Email</label>
            <input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition shadow-sm hover:shadow-md"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1">Password</label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition shadow-sm hover:shadow-md"
            />
          </div>

          {/* Role */}
          <div className="flex items-center gap-5 text-sm font-semibold my-2">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} />
              Student
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} />
              Recruiter
            </label>
          </div>

          {/* Login Button */}
          {loading ? (
            <Button className="w-full py-2 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow transition transform hover:scale-105">
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow transition transform hover:scale-105 cursor-pointer">
              Login
            </Button>
          )}

          <p className="text-center text-sm mt-2 text-gray-700">
            Don't have an account? <Link to="/signup" className="text-cyan-600 font-bold hover:underline cursor-pointer">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
