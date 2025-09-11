import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setCompanies } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token"); // ya redux me ho to waha se lo
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("Response from backend:", res.data);
        if (res.data.success && res.data.companies) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [dispatch, user]);
};

export default useGetAllCompanies;
