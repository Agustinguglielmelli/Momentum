import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <Link to="/myprofile" className="navbar-link">My profile</Link>
                <Link to="/home" className="navbar-link">Feed</Link>
                <Link to="/events" className="navbar-link">Events</Link>
            </nav>
        </div>
    )


}

export default Navbar;