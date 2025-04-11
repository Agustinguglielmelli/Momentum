import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
}

export default LogoutButton;
