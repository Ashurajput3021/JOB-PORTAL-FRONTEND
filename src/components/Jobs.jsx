// src/pages/Jobs.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCards from "./FilterCards";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { setAllJobs } from "../redux/jobSlice";
import { motion, AnimatePresence } from "framer-motion";

// 🔥 Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }, // ek ek card delay se
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [activeFilter, setActiveFilter] = useState(""); // ✅ new state for filter

  useEffect(() => {
    let jobs = [...allJobs];

    // ✅ Apply searched query
    if (searchedQuery) {
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.salary.toLowerCase().includes(searchedQuery.toLowerCase())
      );
    }

    // ✅ Apply filter (location, industry, salary)
    if (activeFilter) {
      jobs = jobs.filter(
        (job) =>
          job.location?.toLowerCase() === activeFilter.toLowerCase() ||
          job.title?.toLowerCase() === activeFilter.toLowerCase() ||
          job.salary?.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }

    setFilterJobs(jobs);
  }, [allJobs, searchedQuery, activeFilter]);

  // ✅ Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.jobs) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-300 via-indigo-200 to-teal-300">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 flex gap-5 px-4">
        {/* Filter Section */}
        <div className="w-1/5">
          <FilterCards onFilterChange={setActiveFilter} />
        </div>

        {/* Jobs Section */}
        <div className="flex-1">
          {filterJobs.length === 0 ? (
            <span className="text-gray-700">No Jobs Found</span>
          ) : (
            <div className="h-[88vh] overflow-y-auto pb-5">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <AnimatePresence>
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <Job
                        jobId={job._id}
                        posted={new Date(job.createdAt).toLocaleDateString()}
                        company={job.company?.name || "Unknown Company"}
                        companyLogo={job.company?.logo || "/default-logo.png"}
                        location={job.location || "Remote"}
                        title={job.title}
                        positions={job.position || 1}
                        type={job.jobType || "Full Time"}
                        salary={
                          job.salary ? `${job.salary} LPA` : "Negotiable"
                        }
                         description={job.description}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
