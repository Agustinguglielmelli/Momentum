import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <div className="logo">Momentum</div>
                <ul className="nav-links">
                    <li><Link to="/myProfile">My Profile</Link></li>
                    <li><Link to="/feed">Feed</Link></li>
                    <li><Link to="/events">Events</Link></li>
                </ul>
            </nav>
        </div>
    )


}

export default Navbar;