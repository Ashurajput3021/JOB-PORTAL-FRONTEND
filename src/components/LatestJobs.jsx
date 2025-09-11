import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";


const LatestJobs = () => {
  useGetAllJobs(); // fetch jobs on mount
  const { allJobs } = useSelector((state) => state.job);
  

  return (
    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="text-[#6A38C2]">Latest & Top</span> Jobs Openings
        </h1>
        <p className="text-gray-600 mb-8">
          Explore the most exciting opportunities and find your dream job today!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs && allJobs.length > 0 ? (
            allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
          ) : (
            <span>No Job available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
