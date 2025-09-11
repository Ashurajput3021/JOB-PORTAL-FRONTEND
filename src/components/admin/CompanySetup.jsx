import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { motion } from "framer-motion";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("logo", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Prefill form with company details
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || singleCompany.companyName || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
      setPreview(singleCompany.logo || null);
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto py-10 px-6"
      >
        <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/30">
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer"
              type="button"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-white">
              Company Setup
            </h1>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-white">Company Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="mt-2 bg-white/70 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <Label className="text-white">Description</Label>
                <textarea
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="w-full mt-2 bg-white/70 rounded-xl shadow-md p-3 focus:ring-2 focus:ring-indigo-400"
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-white">Website</Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  className="mt-2 bg-white/70 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <Label className="text-white">Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="mt-2 bg-white/70 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-white">Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="mt-2 bg-white/70 rounded-xl shadow-md"
                />
                {preview && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mt-5 flex justify-center"
                  >
                    <img
                      src={preview}
                      alt="Logo Preview"
                      className="w-32 h-32 object-contain rounded-xl border-2 border-white shadow-lg bg-white p-2 "
                    />
                  </motion.div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanySetup;
