import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PostJob = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) setCompanies(res.data.companies);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch companies");
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = formData;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      toast.error("Please fill all required fields");
      return false;
    }

    // ✅ Salary validation (single number ya range dono allow)
    if (salary.includes("-")) {
      const [min, max] = salary.split("-").map((s) => s.trim());
      if (
        isNaN(min) ||
        isNaN(max) ||
        Number(min) <= 0 ||
        Number(max) <= 0 ||
        Number(min) > Number(max)
      ) {
        toast.error("Salary range must be valid numbers (e.g. 12-18)");
        return false;
      }
    } else {
      if (isNaN(salary) || Number(salary) <= 0) {
        toast.error("Salary must be a valid number greater than 0");
        return false;
      }
    }

    // ✅ Position must be a number
    if (isNaN(position) || Number(position) <= 0) {
      toast.error("Position must be a valid number greater than 0");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const res = await axios.post(`${JOB_API_END_POINT}/post`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-teal-100 pb-5">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto my-12 px-6"
      >
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Post a New Job
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Job Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                name="salary"
                placeholder="e.g. 12 or 12-18 LPA"
                value={formData.salary}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="mt-1 border rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div>
              <Label>Experience Level</Label>
              <Input
                name="experience"
                placeholder="e.g. 2 years"
                value={formData.experience}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                name="position"
                placeholder="Number of positions"
                value={formData.position}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div className="sm:col-span-2">
              <Label>Requirements (comma separated)</Label>
              <Input
                name="requirements"
                placeholder="React, Node.js, MongoDB"
                value={formData.requirements}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div className="sm:col-span-2">
              <Label>Company</Label>
              <select
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                className="mt-1 border rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/jobs")}
              className="bg-white/50 hover:bg-white/70 text-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 text-white hover:scale-105 transition-transform shadow-lg"
            >
              Post Job
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PostJob;
