import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listFollowingOrderedByEventsCompleted } from "../../api/functions";
import { jwtDecode } from "jwt-decode";
import "../leaderboardkms/LeaderboardCss.css"; // Asegurate de importar el CSS compartido

function LeaderboardEvents() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const loggedUserId = Number(jwtDecode(token).userId);

    const fetchUsers = async () => {
        try {
            const result = await listFollowingOrderedByEventsCompleted();
            setUsers(result);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="leaderboard-body">
            <div className="header-section">
                <Link to="/home" className="btn btn-leaderboard  btn-primary">← Volver</Link>
                <Link to="/leaderboard-kms" className="btn btn-leaderboard btn-primary">🏃‍♂️ Kilómetros</Link>
            </div>

            {users.length > 0 ? (
                <div className="leaderboard">
                    <h1 className="h1-leaderboard">🏆 Top Eventos</h1>
                    <p className="leaderboard-subtitle">Usuarios que completaron más eventos</p>

                    <div className="podium">
                        {users[1] && (
                            <div className="runner second">
                                <div className="podium-rank">2</div>
                                <div className="trophy">🥈</div>
                                <p className="name">
                                    <Link to={`/myProfile/${users[1].usuario.id}`}>
                                        {users[1].usuario.displayUserName}
                                    </Link>
                                </p>
                                <p className="score">{users[1].eventosCompletados} eventos</p>
                            </div>
                        )}
                        {users[0] && (
                            <div className="runner first">
                                <div className="podium-rank">1</div>
                                <div className="trophy">🥇</div>
                                <p className="name">
                                    <Link to={`/myProfile/${users[0].usuario.id}`}>
                                        {users[0].usuario.displayUserName}
                                    </Link>
                                </p>
                                <p className="score">{users[0].eventosCompletados} eventos</p>
                            </div>
                        )}
                        {users[2] && (
                            <div className="runner third">
                                <div className="podium-rank">3</div>
                                <div className="trophy">🥉</div>
                                <p className="name">
                                    <Link to={`/myProfile/${users[2].usuario.id}`}>
                                        {users[2].usuario.displayUserName}
                                    </Link>
                                </p>
                                <p className="score">{users[2].eventosCompletados} eventos</p>
                            </div>
                        )}
                    </div>

                    <div className="table-section">
                        <div className="table-header">
                            <h2 className="table-title">Clasificación Completa</h2>
                            <p>Todos los corredores ordenados por eventos completados</p>
                        </div>

                        <table className="leaderboard-table">
                            <thead className="leaderboard-thead">
                            <tr className="leaderboard-tr">
                                <th className="leaderboard-th">Pos</th>
                                <th className="leaderboard-th">Corredor</th>
                                <th className="leaderboard-th" style={{ textAlign: 'right' }}>Eventos</th>
                            </tr>
                            </thead>
                            <tbody className="leaderboard-tbody">
                            {users.map((user, index) => (
                                <tr
                                    key={user.usuario.id}
                                    className={Number(user.usuario.id) === loggedUserId ? "highlighted-user" : ""}
                                >
                                    <td className="leaderboard-td">{index + 1}</td>
                                    <td className="leaderboard-td">
                                        <img
                                            className="leaderboard-img"
                                            src={user.usuario.profilePicture}
                                            alt="avatar"
                                        />
                                        <span className="name">
                                            <Link to={`/myProfile/${users[index].usuario.id}`}>
                                                {users[index].usuario.displayUserName}
                                            </Link>
                                        </span>
                                    </td>
                                    <td className="leaderboard-td">
                                        {user.eventosCompletados}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="empty-leaderboard">
                    <div className="empty-icon">🏃‍♂️</div>
                    <h1 className="message-title">Leaderboard vacío</h1>
                    <p className="message-text">
                        Para ver el leaderboard, primero tenés que seguir a otros usuarios.
                    </p>
                </div>
            )}
        </div>
    );
}

export default LeaderboardEvents;
