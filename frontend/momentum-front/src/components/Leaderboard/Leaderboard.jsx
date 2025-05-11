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
        <body className="leaderboard-body">
        <div className="leaderboard">
            <h1 className="h1-leaderboard">Top Runners</h1>
            <div className="podium">
                <div className="runner third">
                    <div className="trophy bronze">🥉</div>
                    <p className="name">Yokito</p>
                    <p className="score">1239 km</p>
                </div>
                <div className="runner first">
                    <div className="trophy gold">🥇</div>
                    <p className="name">santoro #1651997</p>
                    <p className="score">1502 km</p>
                </div>
                <div className="runner second">
                    <div className="trophy silver">🥈</div>
                    <p className="name">Balhwen</p>
                    <p className="score">1474 km</p>
                </div>
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
                            <img className="leaderboard-img" src={userWithKms.usuario.profilePicture} alt="avatar" width="30"/>
                            {userWithKms.usuario.displayUserName}
                        </td>
                        <td className="leaderboard-td">{userWithKms.totalKms?.toFixed(2)}</td>
                    </tr> // el toFixed redondea 2 decimales
                ))}
                </tbody>
            </table>
        </div>
</body>
)
}

export default Leaderboard