import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='menu'>
            <Link to='/miperfil'>Mi Perfil</Link>
            <Link to='feed'>Feed</Link>
            <Link to='/eventos'>Eventos</Link>
        </nav>
    )
}
export default Navbar; 