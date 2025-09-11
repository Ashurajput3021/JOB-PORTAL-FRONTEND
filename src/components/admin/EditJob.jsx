import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const EditJob = () => {
  const { id } = useParams();
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
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const job = res.data.job;
          setFormData({
            title: job.title,
            description: job.description,
            requirements: job.requirements.join(", "),
            salary: job.salary,
            location: job.location,
            jobType: job.jobType,
            experience: job.experienceLevel,
            position: job.position,
            companyId: job.company?._id || "",
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch job ❌");
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Job updated ✅");
        navigate("/admin/jobs");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed ❌");
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
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Job</h2>

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
                placeholder="e.g. 12-33 LPA"
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
                value={formData.experience}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                name="position"
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
              Update Job
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditJob;
