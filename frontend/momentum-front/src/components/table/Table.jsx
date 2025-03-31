import {useEffect, useState} from "react";
import axios from "axios";

function Table () {

    const [users, setUsers] = useState([]);  // Estado para guardar los usuarios
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const result = await axios.get("http://localhost:8080/usuario");
                setUsers(result.data); // Actualizamos el estado con los usuarios
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            }
        };

        loadUsers(); // Llamamos a la función para cargar los usuarios
    }, []); // Solo se ejecuta una vez cuando el componente se monta
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">foto</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td><img src={user.profile_picture} alt="Perfil" width="50" /></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default Table;