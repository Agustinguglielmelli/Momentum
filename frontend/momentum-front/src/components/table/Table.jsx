import {useEffect, useState} from "react";
import axios from "axios";
import Button from "../button/Button";
import {listUsers} from "../../api/functions";

function Table() {

    const [users, setUsers] = useState([]);  // Estado para guardar los usuarios
    useEffect(() => {
        const loadUsers = async () => {
            try {

                setUsers(await listUsers()); // Actualizamos el estado con los usuarios.
            } catch (error) {

                console.error("Error" + " al cargar usuarios:", error);
            }
        };
        loadUsers(); // Llamamos a la función para cargar los usuarios
    }, []); // Solo se ejecuta una vez cuando el componente se monta


    async function deleteUser(id) {
        try {
            await axios.delete(`http://localhost:8080/usuario/${id}`);
            setUsers(await listUsers());
        } catch (error) {
            console.error("Error al cargar usuario:", error);
        }
    }

    return (<table className="table table-striped">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">foto</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
            <tr key={user.id}>
            <th scope="row">{index + 1}</th>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td><img src={user.profile_picture} alt="Perfil" width="50"/></td>
            <td>
                <Button text="Update" className="btn-primary"/>
                <Button text="Delete" className="btn-danger" onClick={() => deleteUser(user.id)}/>
            </td>
        </tr>))
        }
        </tbody>
    </table>)
}

export default Table;