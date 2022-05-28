import React from "react";
import { useNavigate } from "react-router-dom";

const Error403 = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/login", { replace: true });
    };
  
    return (
        <>
            <h1>403 Forbidden </h1>
            <p onClick={handleNavigate}>Click here to login</p>
        </>
    );
};

export default Error403;
