import React from "react";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
    const navigate = useNavigate();

    const handleRoleSelection = async (role) => {
        try {
            const response = await fetch("/api/set-role?role=" + role, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            if (response.ok) {
                // Redirigir al home una vez asignado el rol
                navigate("/");
            } else {
                alert("Error al guardar el rol");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>¿Qué tipo de usuario sos?</h2>
            <button onClick={() => handleRoleSelection("RUNNER")}>Runner</button>
            <button onClick={() => handleRoleSelection("COACH")}>Coach</button>
        </div>
    );
};

export default SelectRole;
