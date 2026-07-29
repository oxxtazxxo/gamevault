import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>GameVault</h2>
            </div>

            <div className="nav-links">
                <a href="#">Home</a>
                <a href="#">Browse</a>
                <a href="#">Favorites</a>
                <a href="#">Top Rated</a>
            </div>

            <div className="login">
                <button>Login</button>
            </div>
        </nav>
    );
}

export default Navbar;