//Este componente sirve para proteger las rutas, es decir que
// solo se puede acceder si hay un token en el header

import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;  //si  hay token, te manda a la ruta que le pasas como argumento, si no hay token te manda al login
}
export default PrivateRoute;