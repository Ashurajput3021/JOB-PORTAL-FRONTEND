import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Briefcase,
  Layers,
  MapPin,
  DollarSign,
  Users,
  CalendarDays,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?._id;

  const [isApplied, setIsApplied] = useState(false);

  // ✅ Fetch single job
  const fetchSingleJob = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.job) {
        dispatch(setSingleJob(res.data.job));

        // Check if current user already applied
        // ✅ check if already applied
        const applied = res.data.job.applications?.some(
          (app) => app.applicant?._id === currentUserId // 🔥 FIX
        );
        setIsApplied(applied);
      }
    } catch (error) {
      console.error("Error fetching job:", error);
      toast.error("Failed to load job details");
    }
  };

  useEffect(() => {
    fetchSingleJob();
  }, [jobId, currentUserId]);

  // ✅ Apply handler
  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);

        // Update job with populated applications from backend
        dispatch(setSingleJob(res.data.job));
        setIsApplied(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (!singleJob)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading job...
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100">
      <motion.div
        className="max-w-5xl w-full mx-auto my-10 p-6 
                   bg-gradient-to-r from-indigo-300 via-gray-10 to-purple-300
                   shadow-2xl rounded-2xl border border-gray-300"
      >
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="font-extrabold text-2xl">{singleJob.title}</h1>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                <Briefcase size={14} /> {singleJob.position}{" "}
                {singleJob.position > 1 ? "Positions" : "Position"}
              </span>
              <span className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-white bg-pink-500 rounded-full">
                <Layers size={14} /> {singleJob.jobType}
              </span>
              <span className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                <DollarSign size={14} /> {singleJob.salary} LPA
              </span>
            </div>
          </div>

          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`px-6 py-2 rounded-xl font-semibold shadow-md transition-all ${
              isApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:scale-105"
            }`}
          >
            {isApplied ? "✅ Already Applied" : "🚀 Apply Now"}
          </Button>
        </div>

        {/* Job Details */}
        <h2 className="mt-6 pb-2 border-b-2 font-medium">Job Details</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6 text-gray-700">
          <div className="flex gap-2 items-start">
            <Briefcase className="mt-1" />{" "}
            <div>
              <p className="font-bold">Role</p>
              <p>{singleJob.title}</p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <Layers className="mt-1" />{" "}
            <div>
              <p className="font-bold">Experience</p>
              <p>{singleJob.experienceLevel}</p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <MapPin className="mt-1" />{" "}
            <div>
              <p className="font-bold">Location</p>
              <p>{singleJob.location}</p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <DollarSign className="mt-1" />{" "}
            <div>
              <p className="font-bold">Salary</p>
              <p>{singleJob.salary} LPA</p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <Users className="mt-1" />{" "}
            <div>
              <p className="font-bold">Applicants</p>
              <p>{singleJob.applications?.length || 0}</p>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <CalendarDays className="mt-1" />{" "}
            <div>
              <p className="font-bold">Posted On</p>
              <p>
                {formatDistanceToNow(new Date(singleJob.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <h2 className="mt-8 pb-2 border-b-2 font-medium">Required Skills</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {singleJob.requirements?.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-red-200 rounded-full shadow-sm hover:bg-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default JobDescription;
