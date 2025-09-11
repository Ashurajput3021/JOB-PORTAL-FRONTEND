import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // agar user null hai ya user.role recruiter nahi hai to home pe bhej do
    if (!user || user.role !== "recruiter") {
      navigate("/");
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
