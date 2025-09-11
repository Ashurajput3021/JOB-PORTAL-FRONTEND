import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { setApplicants } from "@/redux/applicationSlice";
import { useDispatch, useSelector } from "react-redux";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.application.applicants);

  useEffect(() => {
    const fetchAllApplicant = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setApplicants(res.data.job.applications || []));
        }
      } catch (error) {
        console.log("Error fetching applicants:", error);
      }
    };
    fetchAllApplicant();
  }, [params.id, dispatch]);

  const handleStatusUpdate = (appId, status) => {
    const updatedApplicants = applicants.map((app) =>
      app._id === appId ? { ...app, status } : app
    );
    dispatch(setApplicants(updatedApplicants));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="font-bold text-2xl mb-6">Applicants ({applicants.length})</h1>
        <ApplicantsTable applicants={applicants} onStatusUpdate={handleStatusUpdate} />
      </div>
    </div>
  );
};

export default Applicants;
