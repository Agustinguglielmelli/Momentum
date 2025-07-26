import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SelectRole.css";

const SelectRole = () => {
    const navigate = useNavigate();

    const handleRoleSelection = async (role) => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:8080/set-role",
                { role },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error al seleccionar rol:", error);
            alert(
                error.response?.data?.message ||
                "Hubo un error al asignar el rol. Intentalo de nuevo."
            );
        }
    };

    return (
        <div className="role-selection-container">
            <h2 className="role-selection-title">¿Qué tipo de usuario sos?</h2>
            <div className="role-buttons">
                <button className="role-btn runner" onClick={() => handleRoleSelection("RUNNER")}>
                    🏃‍♂️ Runner
                </button>
                <button className="role-btn coach" onClick={() => handleRoleSelection("COACH")}>
                    🏋️‍♂️ Coach
                </button>
            </div>
        </div>
    );
};

export default SelectRole;
