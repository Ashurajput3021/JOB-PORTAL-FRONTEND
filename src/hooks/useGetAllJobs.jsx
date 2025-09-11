// src/hooks/useGetAllJobs.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllJobs } from "../redux/jobSlice";
import { JOB_API_END_POINT } from "../utils/constant";

const useGetAllJobs = (searchQuery = "") => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchQuery}`,
          { withCredentials: true }
        );

        if (res.data.success && res.data.jobs) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          dispatch(setAllJobs([]));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        dispatch(setAllJobs([]));
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [dispatch, searchQuery]);

  return { loading }; // ✅ return loading so component can use it
};

export default useGetAllJobs;
