import "./LeaderboardCss.css"
import {useEffect, useState} from "react";
import {listFollowingOrderedByKms} from "../../api/functions";

function Leaderboard () {

    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const result = await listFollowingOrderedByKms();
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
            {users.length > 0 ? (
                <div className="leaderboard">
                    <h1 className="h1-leaderboard">Top Runners</h1>
                    <div className="podium">
                        {users[1] && (
                            <div className="runner second">
                                <div className="trophy silver">🥈</div>
                                <p className="name">{users[1].usuario.displayUserName}</p>
                                <p className="score">{users[1].totalKms} km</p>
                            </div>
                        )}
                        {users[0] && (
                            <div className="runner first">
                                <div className="trophy gold">🥇</div>
                                <p className="name">{users[0].usuario.displayUserName}</p>
                                <p className="score">{users[0].totalKms} km</p>
                            </div>
                        )}
                        {users[2] && (
                            <div className="runner third">
                                <div className="trophy bronze">🥉</div>
                                <p className="name">{users[2].usuario.displayUserName}</p>
                                <p className="score">{users[2].totalKms} km</p>
                            </div>
                        )}
                    </div>

                    <table className="leaderboard-table">
                        <thead className="leaderboard-thead">
                        <tr className="leaderboard-tr">
                            <th className="leaderboard-th">Rank</th>
                            <th className="leaderboard-th">Name</th>
                            <th className="leaderboard-th">Kilometers ran</th>
                        </tr>
                        </thead>

                        <tbody className="leaderboard-tbody">
                        {users.map((userWithKms, index) => (
                            <tr key={userWithKms.usuario.id}>
                                <td className="leaderboard-td">{index + 1}</td>
                                <td className="leaderboard-td">
                                    <img
                                        className="leaderboard-img"
                                        src={userWithKms.usuario.profilePicture}
                                        alt="avatar"
                                        width="30"
                                    />
                                    {userWithKms.usuario.displayUserName}
                                </td>
                                <td className="leaderboard-td">
                                    {userWithKms.totalKms?.toFixed(2)}
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

export default Leaderboard