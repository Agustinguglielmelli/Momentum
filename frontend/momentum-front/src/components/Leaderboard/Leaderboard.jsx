import "./LeaderboardCss.css"

function Leaderboard () {
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
                <tr>
                    <td className="leaderboard-td">1</td>
                    <td className="leaderboard-td">santoro #1651997</td>
                    <td className="leaderboard-td">1502</td>
                </tr>
                <tr>
                    <td className="leaderboard-td">1</td>
                    <td className="leaderboard-td">santoro #1651997</td>
                    <td className="leaderboard-td">1502</td>
                </tr>
                <tr>
                    <td className="leaderboard-td">1</td>
                    <td className="leaderboard-td">santoro #1651997</td>
                    <td className="leaderboard-td">1502</td>
                </tr>
                <tr>
                    <td className="leaderboard-td">1</td>
                    <td className="leaderboard-td">santoro #1651997</td>
                    <td className="leaderboard-td">1502</td>
                </tr>
                </tbody>
            </table>
        </div>
        </body>
    )
}

export default Leaderboard