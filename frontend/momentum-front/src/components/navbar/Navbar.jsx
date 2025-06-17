import { Link } from 'react-router-dom';
import './Navbar.css'
import {jwtDecode} from "jwt-decode";
function Navbar({ searchBar }) {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    return (
        <div>
            <nav className="navbar">
                <div className="logo">Momentum</div>
                <ul className="nav-links">
                    <li><Link to={`/myProfile/${userId}`}>My Profile</Link></li>
                    <li><Link to="/feed">Feed</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    <li><Link to="/leaderboard-kms">Leaderboards</Link></li>
                </ul>
                {searchBar && <div className="search-bar-container">{searchBar}</div>}
            </nav>
        </div>
    )


}

export default Navbar;