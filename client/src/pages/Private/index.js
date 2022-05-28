import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelector } from "../../store/reducers/authSlice";
const PrivatePage = ({ children }) => {
    const auth = useSelector(authSelector);
    if (auth.isAuthenticated) return children;
    else return <Navigate to="/403" replace />;
};

export default PrivatePage;
