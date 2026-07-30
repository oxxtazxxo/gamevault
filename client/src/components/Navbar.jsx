import "../styles/Navbar.css";
import logo from "../assets/images/gamevault-logo.png";
import logo2x from "../assets/images/gamevault-logo@2x.png";

function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="logo" aria-label="GameVault home">
        <img
          src={logo}
          srcSet={`${logo} 1x, ${logo2x} 2x`}
          alt="GameVault"
        />

        <span>GameVault</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="#">Browse</a>
        <a href="#">Favorites</a>
        <a href="#">Top Rated</a>
      </nav>

      <button type="button" className="login">
        Login
      </button>
    </header>
  );
}

export default Navbar;