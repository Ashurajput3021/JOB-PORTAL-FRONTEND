import React from "react";
import { MapPin, Briefcase, DollarSign, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)} // ✅ fixed here
      className="p-6 rounded-3xl shadow-md bg-gradient-to-r from-blue-100 via-green-100 to-pink-100 border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Company Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={job?.company?.logo || "/default-logo.png"}
          alt={job?.company?.name || "Company Logo"}
          className="w-10 h-10 rounded-full object-cover shadow-sm"
        />
        <h2 className="text-lg font-bold text-gray-800">
          {job?.company?.name || "Unknown Company"}
        </h2>
      </div>

      {/* Job Title & Location */}
      <div className="flex items-center gap-4 mb-2">
        <div>
          <h1 className="font-semibold text-xl text-gray-900">
            {job?.title || "Job Title"}
          </h1>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <MapPin size={16} />
            <span>{job?.location || "Remote"}</span>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <p className="text-sm text-gray-700 leading-relaxed mt-2">
        {job?.description || "Job description not available."}
      </p>

      {/* Requirements */}
      {job?.requirements?.length > 0 && (
        <div className="mt-3">
          <h4 className="font-semibold text-gray-800 text-sm mb-1">
            Requirements:
          </h4>
          <ul className="list-disc ml-5 text-xs text-gray-600">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Badges */}
      <div className="flex items-center flex-wrap gap-2 mt-5">
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-md hover:scale-105 transform transition-all duration-200">
          <Briefcase size={14} /> {job?.position || 1} Positions
        </span>
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-pink-500 to-red-600 shadow-md hover:scale-105 transform transition-all duration-200">
          <Briefcase size={14} /> {job?.jobType || "Full-Time"}
        </span>
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-md hover:scale-105 transform transition-all duration-200">
          <DollarSign size={14} />{" "}
          {job?.salary ? `${job.salary} LPA` : "Negotiable"}
        </span>
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 to-purple-600 shadow-md hover:scale-105 transform transition-all duration-200">
          <Star size={14} /> {job?.experienceLevel || 0} yrs Exp
        </span>
      </div>
    </div>
  );
};

export default LatestJobCards;
