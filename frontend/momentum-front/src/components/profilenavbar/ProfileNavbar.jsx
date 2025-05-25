
// src/components/profile/ProfileNavbar.jsx
import "./ProfileNavbar.css";

function ProfileNavbar({ selectedTab, onSelectTab }) {
    return (
        <div className="profile-navbar">
            <button
                className={selectedTab === "posts" ? "active" : ""}
                onClick={() => onSelectTab("posts")}
            >
                Publicaciones
            </button>
            <button
                className={selectedTab === "highlights" ? "active" : ""}
                onClick={() => onSelectTab("highlights")}
            >
                Historias destacadas
            </button>
            <button
                className={selectedTab === "tagged" ? "active" : ""}
                onClick={() => onSelectTab("tagged")}
            >
                Etiquetado
            </button>
        </div>
    );
}

export default ProfileNavbar;
