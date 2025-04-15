import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                <ul className="navbar-nav d-flex w-100 justify-content-between px-4">
                    <li className="nav-item flex-fill text-center px-2">
                        <Link className="nav-link active" to="/miperfil/createTrainingPlan">My profile</Link>
                    </li>
                    <li className="nav-item flex-fill text-center px-2">
                        <Link className="nav-link active" to="/miperfil/createTrainingPlan">Feed</Link>
                    </li>
                    <li className="nav-item flex-fill text-center px-2">
                        <Link className="nav-link active" to="/events">Events</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )

}

export default Navbar;