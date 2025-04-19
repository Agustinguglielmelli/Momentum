import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
    return (
    <div className="navbar">
      <Link to="/miperfil" >My Profile</Link>
      <Link to="/home" >Feed</Link>
      <Link to="/events">Events</Link>
      
    </div>
    )
        

}

export default Navbar;