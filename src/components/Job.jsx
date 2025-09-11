// src/components/Job.jsx
import React from "react";
import { Bookmark, Briefcase, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Job = ({
  jobId = "sbsjvjbsdvjhsdb",
  posted = "2 days ago",
  company = "Company Inc.",
  companyLogo = "https://via.placeholder.com/80",
  location = "India",
  title = "Job Title",
  positions = 1,
  type = "Full Time",
  salary = "10 LPA",
  description = "No description provided", // ✅ Added description prop
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 rounded-3xl shadow-md bg-gradient-to-r from-blue-100 via-green-100 to-pink-100 border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Top Row: Posted Time + Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 italic">📅 Posted {posted}</p>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gray-300 bg-white hover:bg-gray-100 hover:shadow-md transition"
        >
          <Bookmark className="w-5 h-5 text-gray-600" />
        </Button>
      </div>

      {/* Company Logo + Name */}
      <div className="flex items-center gap-3 my-4">
        <div className="w-14 h-14 rounded-full overflow-hidden shadow-sm bg-white flex items-center justify-center">
          <img
            src={companyLogo || "/default-logo.png"}
            alt={`${company} Logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-bold text-gray-800">{company}</h2>
      </div>

      {/* Job Title & Location */}
      <div className="mb-2">
        <h1 className="font-semibold text-xl text-gray-900">{title}</h1>
        <p className="text-sm flex items-center gap-1 text-gray-500 mt-1">
          <MapPin size={14} className="text-blue-500" /> {location}
        </p>
      </div>

      {/* ✅ Dynamic Job Description */}
      <p className="text-sm text-gray-700 leading-relaxed mt-2 line-clamp-3">
        {description}
      </p>

      {/* Badges */}
      <div className="flex items-center flex-wrap gap-2 mt-5">
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:scale-105 transform transition-all duration-200">
          <Briefcase size={14} /> {positions} {positions > 1 ? "Positions" : "Position"}
        </span>
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-pink-500 to-red-600 shadow-md hover:scale-105 transform transition-all duration-200">
          <Briefcase size={14} /> {type}
        </span>
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:scale-105 transform transition-all duration-200">
          <DollarSign size={14} /> {salary}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={() => navigate(`/description/${jobId}`)}
          variant="outline"
          className="flex-1 border-gray-300 hover:bg-gray-100 hover:shadow-md transition cursor-pointer"
        >
          View Details
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md transition">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
