// src/components/shared/Loader.jsx
import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-teal-100">
      {/* Company Logo Bounce Animation */}
      <motion.img
        src="/logo.png" // ✅ apna logo yaha daal (public folder me rakho)
        alt="Company Logo"
        className="w-20 h-20 object-contain"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: 1 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Spinning Circle */}
      <motion.div
        className="w-14 h-14 mt-6 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Text Animation */}
      <motion.h2
        className="mt-6 text-xl font-semibold text-gray-700 tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
      >
        Loading Jobs Portal...
      </motion.h2>
    </div>
  );
};

export default Loader;
