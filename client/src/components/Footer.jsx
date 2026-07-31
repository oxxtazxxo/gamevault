// footer components for the bottom of the GameVault website

import "../styles/Footer.css";
import logo from "../assets/images/gamevault-logo.png";
import { FaGithub } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* logo and branding */}
                <div className="footer-brand">

                    <img
                        src={logo}
                        alt="GameVault Logo"
                        className="footer-logo"
                    />

                    <div className="footer-brand-text">

                        <h3>GameVault • 2026</h3>

                    <p>
                        All your games.
                        <br />
                        All in one vault.
                    </p>

                </div>

                </div>

                {/* footer links */}
                <div className="footer-right">
                    <div className="footer-links">
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    </div>

                    {/* credits */}
                    <div className="footer-powered">
                        <p>
                            Powered by{" "}
                            <a
                                href="https://rawg.io/apidocs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                RAWG API
                            </a>
                        </p>

                        <a
                            href="https://github.com/oxxtazxxo/gamevault"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                        >
                            <FaGithub />
                            GitHub Repository
                        </a>
                    </div>
                </div>
                
            </div>
        </footer>
    );
}

export default Footer;