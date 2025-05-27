
// src/components/profile/ProfileNavbar.jsx
import "./ProfileNavbar.css";

function ProfileNavbar({ selectedTab, onSelectTab }) {
    return (
        <div className="profile-navbar">
            <button
                className={selectedTab === "posts" ? "active" : ""}
                onClick={() => onSelectTab("posts")}
            >
                Posts
            </button>
            <button
                className={selectedTab === "Goals" ? "active" : ""}
                onClick={() => onSelectTab("Goals")}
            >
                Goals
            </button>
        </div>
    );
}

export default ProfileNavbar;
