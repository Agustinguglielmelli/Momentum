import "./LeaderboardCss.css";
import React, { useEffect, useState } from "react";
import { listFollowingOrderedByKms } from "../../api/functions";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function LeaderboardKms() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const loggedUserId = Number(jwtDecode(token).userId);

    const fetchUsers = async () => {
        try {
            const result = await listFollowingOrderedByKms();
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
                <Link to="/home" className="btn btn-leaderboard btn-primary">← Volver</Link>
                <Link to="/leaderboard-events" className="btn btn-leaderboard  btn-primary">🏆 Eventos</Link>
            </div>

            {users.length > 0 ? (
                <div className="leaderboard">
                    <h1 className="h1-leaderboard">🏃‍♂️ Top Runners</h1>
                    <p className="leaderboard-subtitle">Los corredores que más kilómetros han recorrido</p>

                    <div className="podium">
                        {users[1] && (
                            <div className="runner second">
                                <div className="podium-rank">2</div>
                                <div className="trophy">🥈</div>
                                <p className="name">{users[1].usuario.displayUserName}</p>
                                <p className="score">{users[1].totalKms?.toFixed(1)} km</p>
                            </div>
                        )}
                        {users[0] && (
                            <div className="runner first">
                                <div className="podium-rank">1</div>
                                <div className="trophy">🥇</div>
                                <p className="name">{users[0].usuario.displayUserName}</p>
                                <p className="score">{users[0].totalKms?.toFixed(1)} km</p>
                            </div>
                        )}
                        {users[2] && (
                            <div className="runner third">
                                <div className="podium-rank">3</div>
                                <div className="trophy">🥉</div>
                                <p className="name">{users[2].usuario.displayUserName}</p>
                                <p className="score">{users[2].totalKms?.toFixed(1)} km</p>
                            </div>
                        )}
                    </div>

                    <div className="table-section">
                        <div className="table-header">
                            <h2 className="table-title">Clasificación Completa</h2>
                            <p>Todos los corredores ordenados por kilómetros recorridos</p>
                        </div>

                        <div style={{
                            maxHeight: "270px", // Altura para mostrar aprox. 3 filas
                            overflowY: "auto"
                        }}>
                            <table className="leaderboard-table">
                                <thead className="leaderboard-thead">
                                <tr className="leaderboard-tr">
                                    <th className="leaderboard-th">Pos</th>
                                    <th className="leaderboard-th">Corredor</th>
                                    <th className="leaderboard-th" style={{ textAlign: 'right' }}>Distancia</th>
                                </tr>
                                </thead>
                                <tbody className="leaderboard-tbody">
                                {users.map((userWithKms, index) => (
                                    <tr
                                        key={userWithKms.usuario.id}
                                        className={Number(userWithKms.usuario.id) === loggedUserId ? "highlighted-user" : ""}
                                    >
                                        <td className="leaderboard-td">{index + 1}</td>
                                        <td className="leaderboard-td">
                                            <img
                                                className="leaderboard-img"
                                                src={userWithKms.usuario.profilePicture}
                                                alt="avatar"
                                            />
                                            <span>{userWithKms.usuario.displayUserName}</span>
                                        </td>
                                        <td className="leaderboard-td" style={{ textAlign: 'right' }}>
                                            {userWithKms.totalKms?.toFixed(2)} <span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 400 }}>km</span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
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

export default LeaderboardKms;
