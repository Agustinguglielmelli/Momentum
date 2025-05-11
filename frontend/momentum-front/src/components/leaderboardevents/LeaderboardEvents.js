
    import React, {useEffect, useState} from "react";
    import {Link} from "react-router-dom";
    import {listFollowingOrderedByEventsCompleted} from "../../api/functions";

    function LeaderboardEvents () {

        const [users, setUsers] = useState([])

        const fetchUsers = async () => {
            try {
                const result = await listFollowingOrderedByEventsCompleted();
                setUsers(result);
            } catch (e) {
                console.log(e);
            }
        }

        useEffect(() => {
            fetchUsers();
        }, []);

        return (
            <div className="leaderboard-body">
                <Link to={"/home"} className="btn btn-primary">Back</Link>
                <Link to={"/leaderboard-kms"} className="btn btn-primary">Leaderboard Kms</Link>
                {users.length > 0 ? (
                    <div className="leaderboard">
                        <h1 className="h1-leaderboard">Top events completed</h1>
                        <div className="podium">
                            {users[1] && (
                                <div className="runner second">
                                    <div className="trophy silver">🥈</div>
                                    <p className="name">{users[1].usuario.displayUserName}</p>
                                    <p className="score">{users[1].eventosCompletados} events completed</p>
                                </div>
                            )}
                            {users[0] && (
                                <div className="runner first">
                                    <div className="trophy gold">🥇</div>
                                    <p className="name">{users[0].usuario.displayUserName}</p>
                                    <p className="score">{users[0].eventosCompletados} events completed</p>
                                </div>
                            )}
                            {users[2] && (
                                <div className="runner third">
                                    <div className="trophy bronze">🥉</div>
                                    <p className="name">{users[2].usuario.displayUserName}</p>
                                    <p className="score">{users[2].eventosCompletados} events completed</p>
                                </div>
                            )}
                        </div>

                        <table className="leaderboard-table">
                            <thead className="leaderboard-thead">
                            <tr className="leaderboard-tr">
                                <th className="leaderboard-th">Rank</th>
                                <th className="leaderboard-th">Name</th>
                                <th className="leaderboard-th">Events completed</th>
                            </tr>
                            </thead>

                            <tbody className="leaderboard-tbody">
                            {users.map((userWithEventsCompleted, index) => (
                                <tr key={userWithEventsCompleted.usuario.id}>
                                    <td className="leaderboard-td">{index + 1}</td>
                                    <td className="leaderboard-td">
                                        <img
                                            className="leaderboard-img"
                                            src={userWithEventsCompleted.usuario.profilePicture}
                                            alt="avatar"
                                            width="30"
                                        />
                                        {userWithEventsCompleted.usuario.displayUserName}
                                    </td>
                                    <td className="leaderboard-td">
                                        {userWithEventsCompleted.eventosCompletados}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-leaderboard">
                        <h1 className="message-title">🏃‍♂️ Leaderboard vacío</h1>
                        <p className="message-text">
                            Para ver el leaderboard, primero tenés que seguir a otros usuarios.
                        </p>
                    </div>
                )}
            </div>
        )
    }

    export default LeaderboardEvents