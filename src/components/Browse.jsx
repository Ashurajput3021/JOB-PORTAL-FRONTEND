import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  // Hook to fetch jobs based on searchedQuery
  useGetAllJobs(searchedQuery);

  const [loading, setLoading] = useState(true);

  // Show loading until jobs are fetched
  useEffect(() => {
    setLoading(true);
  }, [searchedQuery]);

  useEffect(() => {
    if (allJobs) setLoading(false);
  }, [allJobs]);

  // Clear searchQuery when component mounts without any search
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 py-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Search Results ({allJobs.length})
          </h1>

          {loading ? (
            <p className="text-gray-600">Loading jobs...</p>
          ) : allJobs.length === 0 ? (
            <p className="text-gray-700">No Jobs Found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJobs.map((job) => (
                <Job
                  key={job._id}
                  jobId={job._id}
                  posted={new Date(job.createdAt).toLocaleDateString()}
                  company={job.company?.name || "Unknown Company"}
                  companyLogo={job.company?.logo || "/default-logo.png"}
                  title={job.title}
                  location={job.location}
                  salary={job.salary ? `${job.salary} LPA` : "Negotiable"}
                  type={job.jobType}
                  positions={job.position}
                  description={job.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
