import "./css.css";
import {Link} from "react-router-dom";
import ChatComponent from "../chat/ChatComponent";
function HomePage() {
    return (
        <div>
            <nav class="navbarHome">
                <div class="logo">Momentum</div>
                <div class="nav-buttons">
                    <Link className="nav-buttons nav-btn" to="/login">Log in</Link>
                    <Link className="nav-buttons nav-btn" to="/signup">Signup</Link>
                </div>
            </nav>
            <ChatComponent/>
            <main class="hero">
                <div class="hero-content">
                    <h1>Impulsa tu entrenamiento con Momentum</h1>
                    <p>La plataforma social para runners y coaches. Comparte tus entrenamientos, sigue planes personalizados,
                        organiza eventos y conecta con apasionados del running.</p>
                </div>
            </main>
        </div>
)
}
export default HomePage;