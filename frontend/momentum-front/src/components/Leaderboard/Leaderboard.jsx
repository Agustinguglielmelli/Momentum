import "./LeaderboardCss.css"

function Leaderboard () {
    return (
        <body>
        <div className="leaderboard">
            <h1>Top Runners</h1>
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

            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Kilometers ran</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>santoro #1651997</td>
                    <td>1502</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Balhwen</td>
                    <td>1474</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Yokito</td>
                    <td>1239</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>#3 Yokito's | Coqui</td>
                    <td>1117</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>#1 Yokito's | Rigo</td>
                    <td>1081</td>
                </tr>
                </tbody>
            </table>
        </div>
        </body>
    )
}

export default Leaderboard