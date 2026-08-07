import "../styles/Navbar.css";
import logo from "../assets/images/gamevault-logo.png";
import logo2x from "../assets/images/gamevault-logo@2x.png";
import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="navbar">
      <Link
        to="/home"
        className="logo"
        aria-label="GameVault home"
      >
        <img
          src={logo}
          srcSet={`${logo} 1x, ${logo2x} 2x`}
          alt="GameVault"
        />

        <span>GameVault</span>
      </Link>

      <nav
        className="nav-links"
        aria-label="Main navigation"
      >
        <Link to="/home">Home</Link>
        <Link to="/home">Browse</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/home">Top Rated</Link>
      </nav>

      <div className="navbar-actions">
        <Link
          to="/"
          className={`switch-mode-button ${
            (localStorage.getItem("gameVaultMode") || "demo") === "demo"
              ? "demo-switch"
              : "live-switch"
          }`}
        >
          Switch Mode
        </Link>

        <Link
          to={user ? "/profile" : "/login"}
          className="login"
        >
          {user ? "Profile" : "Login"}
        </Link>
      </div>
    </header>
  );
}

export default Navbar;