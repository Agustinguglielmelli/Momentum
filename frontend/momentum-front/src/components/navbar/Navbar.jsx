import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
    return (
        <div>
            <div className="navbar">
                <Link className="navbar-a" to="/miperfil">My Profile</Link>
                <Link className="navbar-a" to="/home">Feed</Link>
                <Link className="navbar-a" to="/events">Events</Link>
            </div>
            <nav className="navbar2">
                <a href="#" className="navbar-link">My profile</a>
                <a href="#" className="navbar-link">Feed</a>
                <a href="#" className="navbar-link">Events</a>
            </nav>
        </div>
    )


}

export default Navbar;