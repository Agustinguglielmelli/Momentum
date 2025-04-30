import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar({ searchBar }) {
    return (
        <div>
            <nav className="navbar">
                <div className="logo">Momentum</div>
                <ul className="nav-links">
                    <li><Link to="/myProfile">My Profile</Link></li>
                    <li><Link to="/feed">Feed</Link></li>
                    <li><Link to="/events">Events</Link></li>
                </ul>
                {searchBar && <div className="search-bar-container">{searchBar}</div>}
            </nav>
        </div>
    )


}

export default Navbar;