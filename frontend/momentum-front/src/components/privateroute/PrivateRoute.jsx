import {isTokenExpired} from "../../api/functions"
//Este componente sirve para proteger las rutas, es decir que
// solo se puede acceder si hay un token en el header

import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token"); // lo limpiamos si ya no sirve
        return <Navigate to="/login" replace />;
    }

    return children;
}
export default PrivateRoute;