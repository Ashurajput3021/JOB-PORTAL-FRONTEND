// components/ApplicantsTable.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setApplicants } from "@/redux/applicationSlice";
import { toast } from "sonner";

const ApplicantsTable = () => {
  const { applicants } = useSelector((state) => state.application);
  const dispatch = useDispatch();

  const statusHandler = async (appId, status) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${appId}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Status updated ✅");

        // Update locally
        const updatedApplicants = applicants.map((app) =>
          app._id === appId ? { ...app, status: status.toLowerCase() } : app
        );
        dispatch(setApplicants(updatedApplicants));
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to update status ❌");
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 border border-yellow-300"; // pending
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full rounded-2xl shadow-xl overflow-hidden">
       <thead className="bg-gradient-to-r from-purple-200 via-pink-200 to-teal-200 text-gray-800">
  <tr>
    <th className="px-4 py-3 text-left">Name</th>
    <th className="px-4 py-3 text-left">Email</th>
    <th className="px-4 py-3 text-left">Contact</th> 
    <th className="px-4 py-3 text-left">Applied On</th> 
    <th className="px-4 py-3 text-left">Resume</th>
    <th className="px-4 py-3 text-left">Status</th>
    <th className="px-4 py-3 text-left">Change Status</th>
  </tr>
</thead>
<tbody>
  {applicants.length > 0 ? (
    applicants.map((app) => (
      <tr
        key={app._id}
        className="border-b hover:bg-white/20 transition-colors duration-200"
      >
        <td className="px-4 py-3 text-gray-800 font-medium">
          {app.applicant?.fullname || "N/A"}
        </td>
        <td className="px-4 py-3 text-gray-700">
          {app.applicant?.email || "N/A"}
        </td>
        <td className="px-4 py-3 text-gray-700">
          {app.applicant?.phoneNumber || "N/A"}
        </td>
        <td className="px-4 py-3 text-gray-700">
          {app.createdAt
            ? new Date(app.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A"}
        </td>
        <td>
          {app.applicant?.profile?.resume ? (
            <a
              href={app.applicant.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="text-blue-600 hover:underline font-medium"
            >
              Download Resume
            </a>
          ) : (
            <span className="text-gray-400">No Resume</span>
          )}
        </td>
        <td className="px-4 py-3">
          <span
            className={`px-3 py-1 rounded-full font-semibold ${getStatusClasses(
              app.status
            )} cursor-pointer hover:scale-105 transition-transform duration-200`}
          >
            {app.status || "pending"}
          </span>
        </td>
        <td className="px-4 py-3">
          <select
            className="px-3 py-1 rounded-lg shadow-md bg-gradient-to-r from-green-100 via-teal-100 to-blue-100 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all cursor-pointer"
            value={app.status?.toLowerCase() || "pending"}
            onChange={(e) => statusHandler(app._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="7" 
        className="text-center py-6 text-gray-500 font-medium"
      >
        🚫 No applicants yet
      </td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
