import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAppliedJobs, updateAppliedJobStatus } from "@/redux/appliedJobsSlice";
import { toast } from "sonner";

const useAppliedJobs = () => {
  const dispatch = useDispatch();
  const { appliedJobs } = useSelector((state) => state.appliedJobs);

  // ✅ Fetch all applied jobs
  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
        withCredentials: true,
      });
      dispatch(setAppliedJobs(res.data.application));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applied jobs ❌");
    }
  };

  // ✅ Update status (accept/reject/pending)
  const updateStatus = async (applicationId, status) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(updateAppliedJobStatus({ applicationId, status }));
        toast.success("Status updated ✅");
      } else {
        toast.error("Failed to update status ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status ❌");
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return { appliedJobs, fetchAppliedJobs, updateStatus };
};

export default useAppliedJobs;
