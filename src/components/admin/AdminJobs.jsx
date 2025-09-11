import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pb-5">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto my-12 px-6"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/20 backdrop-blur-md border border-white/30 p-5 rounded-2xl shadow-xl">
          <div className="relative w-full sm:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              className="pl-10 pr-4 py-2 w-full rounded-xl bg-white/70 shadow-md focus:ring-2 focus:ring-blue-400"
              placeholder="Filter by company or role"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button
            onClick={() => navigate("/admin/jobs/post")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            New Job
          </Button>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
          <AdminJobsTable />
        </div>
      </motion.div>
    </div>
  );
};

export default AdminJobs;
