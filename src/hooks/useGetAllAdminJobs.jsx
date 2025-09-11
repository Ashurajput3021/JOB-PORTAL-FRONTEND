import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllAdminJobs } from "../redux/jobSlice";
import { JOB_API_END_POINT } from "../utils/constant";

const useGetAllAdminJobs = (page = 1, limit = 10) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // ✅ always top-level
  const allAdminJobs = useSelector((state) => state.job.allAdminJobs);

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/admin/jobs?page=${page}&limit=${limit}`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.jobs) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching admin jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminJobs();
  }, [dispatch, page, limit]);

  return { allAdminJobs, loading };
};

export default useGetAllAdminJobs;
