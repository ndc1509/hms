import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelector } from "../../store/reducers/authSlice";
import Login from "../../components/Login";

const LoginPage = () => {
    const auth = useSelector(authSelector);
    if (auth.isAuthenticated) return <Navigate to="/home" replace />;
    else return <Login />;
};

export default LoginPage;
