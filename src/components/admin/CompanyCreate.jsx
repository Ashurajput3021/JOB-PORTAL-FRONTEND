import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { motion } from "framer-motion";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const registerNewCompany = async (e) => {
    e.preventDefault();
    if (!companyName.trim()) return toast.error("Company name is required");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", companyName);

      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message || "Company created successfully");
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (err) {
      console.error("❌ Error creating company:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center items-start py-12 px-4"
      >
        <div className="w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Company</h1>
          <form onSubmit={registerNewCompany} className="space-y-4">
            <div>
              <Label className="text-gray-700">Company Name</Label>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="JobHunt, Microsoft etc."
                className="mt-2 bg-white/70 rounded-xl shadow-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/companies")}
                disabled={loading}
                className="flex-1 rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 text-white font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                {loading ? "Creating..." : "Continue"}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyCreate;
