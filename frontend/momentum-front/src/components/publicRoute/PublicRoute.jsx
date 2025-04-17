import { Navigate } from "react-router-dom";

function PublicOnlyRoute({ children }) {
    const isAuth = localStorage.getItem("token") !== null;

    if (isAuth) {
        return <Navigate to="/home" replace />;
        // el replace hace que no pueda usar el boton de atras del navegador para volver al login (si esta logueado)
    }

    return children;
}

export default PublicOnlyRoute;