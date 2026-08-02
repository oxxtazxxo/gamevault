import "../styles/Navbar.css";
import logo from "../assets/images/gamevault-logo.png";
import logo2x from "../assets/images/gamevault-logo@2x.png";
// import navigation links from react router
import { Link } from "react-router-dom";

// website nav links from react router
function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo" aria-label="GameVault home">
        <img
          src={logo}
          srcSet={`${logo} 1x, ${logo2x} 2x`}
          alt="GameVault"
        />

        <span>GameVault</span>
      </Link>
      
      <nav className="nav-links" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/">Browse</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/">Top Rated</Link>
      </nav>

      <Link to="/login" className="login">
        Login
      </Link>
    </header>
  );
}

export default Navbar;