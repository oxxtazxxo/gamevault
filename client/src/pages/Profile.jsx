import { useEffect, useState } from "react";
import logo from "../assets/images/gamevault-logo.png";
import logo2x from "../assets/images/gamevault-logo@2x.png";
import "../styles/Profile.css";

function Profile() {
    // Store the currently logged-in user.
    const [user, setUser] = useState(null);

    // Load the user information from localStorage when the page opens.
    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // Log the user out and return to the login page.
    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    }

    return (
            <main className="profile-page">

                <section className="profile-card">

                    <header className="profile-header">
                        
                        <img
                            src={logo}
                            srcSet={`${logo} 1x, ${logo2x} 2x`}
                            alt="GameVault Logo"
                            className="profile-logo"
                        />

                        <h1>Welcome Back!</h1>

                        <h2>
                            <span>♦</span> {user?.username} <span>♦</span>
                        </h2>

                        <p>Thanks for using GameVault ♥</p>

                    </header>

                    <section className="profile-stats">

                        <article className="stat-card">
                            <h3>⭐ Favorites</h3>
                            <p>0</p>
                        </article>

                        <article className="stat-card">
                            <h3>🎮 Games Viewed</h3>
                            <p>0</p>
                        </article>

                    </section>

                    <footer className="profile-actions">

                        <button
                            className="profile-button"
                            onClick={() => (window.location.href = "/")}
                        >
                            Browse Games
                        </button>

                        <button
                            className="profile-button logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </footer>

            </section>

        </main>
        );
}

export default Profile;