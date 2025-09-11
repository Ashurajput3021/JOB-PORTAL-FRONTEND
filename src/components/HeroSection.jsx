import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate, useLocation } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchedQuery } = useSelector((store) => store.job);

  const searchJobHandeler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Clear input when coming back if searchedQuery is empty
  useEffect(() => {
    if (!searchedQuery) setQuery("");
  }, [location.key, searchedQuery]);

  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Floating particles, bubbles, stars remain the same...
  const particles = Array.from({ length: 20 }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));

  const bubbles = Array.from({ length: 10 }, () => ({
    left: Math.random() * 100,
    size: Math.random() * 40 + 20,
    duration: Math.random() * 8 + 6,
  }));

  const stars = Array.from({ length: 30 }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 6,
  }));

  return (
    <div className="relative bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 text-white py-28 overflow-hidden">
      {/* Floating Particles */}
      {particles.map((p, i) => (
        <div
          key={`particle-${i}`}
          className="absolute bg-white rounded-full opacity-60 animate-pulse"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Rising Bubbles */}
      {bubbles.map((b, i) => (
        <div
          key={`bubble-${i}`}
          className="absolute bg-white/20 rounded-full animate-bubble"
          style={{
            bottom: `-${b.size}px`,
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}

      {/* Stars */}
      {stars.map((s, i) => (
        <div
          key={`star-${i}`}
          className="absolute bg-white rounded-full animate-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Glowing circles with parallax */}
      <div
        className="absolute top-0 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply opacity-30 animate-pulse"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      ></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply opacity-30 animate-pulse"
        style={{ transform: `translateY(-${offsetY * 0.2}px)` }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center px-5">
        <samp className="mx-auto px-4 py-2 rounded-full bg-white text-purple-600 font-bold text-sm shadow-lg">
          No. 1 𝖩𝗈𝖻 𝖧𝗎𝗇𝗍 𝖶𝖾𝖻𝗌𝗂𝗍𝖾
        </samp>

        <h1 className="text-5xl md:text-6xl font-extrabold mt-4 mb-4">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-yellow-300">Dream Jobs</span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
          JobPortal makes finding and applying for jobs simple and fast. Create
          your profile, explore opportunities, and apply to your dream job in
          just one click!
        </p>

        <div className="flex w-full max-w-md shadow-lg border border-white/30 pl-3 rounded-full items-center gap-4 mx-auto bg-white/10 backdrop-blur-md transition hover:scale-105">
          <input
            type="text"
            placeholder="Find Your Dream jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full bg-transparent text-white placeholder-white/70 py-2 px-2 rounded-l-full"
          />

          <Button
            onClick={searchJobHandeler}
            className="rounded-r-full bg-yellow-400 hover:bg-yellow-500 text-black transition transform hover:scale-105"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Animations CSS */}
      <style>
        {`
          @keyframes bubble {
            0% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { opacity: 0.9; }
            100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
          }
          .animate-bubble { animation: bubble linear infinite; }

          @keyframes star {
            0%, 100% { opacity: 0.3; transform: translateY(0) translateX(0) scale(1); }
            50% { opacity: 1; transform: translateY(-6px) translateX(6px) scale(1.4); }
          }
          .animate-star { animation: star ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default HeroSection;
