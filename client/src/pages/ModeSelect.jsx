import { useNavigate } from "react-router-dom";
import "../styles/ModeSelect.css";

function ModeSelect() {
    const navigate = useNavigate();

    // save the user's selected mode and enters the application
    function handleModeSelection(mode) {

        // store the selected mode so it persists even if the page is refreshed.
        localStorage.setItem("gameVaultMode", mode);

        // continue the shared homepage
        navigate("/home");
    }

    return (
        <main className="mode-select-page">
            <section className="mode-select-content">
                <p className="mode-select-eyebrow">Welcome to</p>

                <h1>GameVault</h1>
                <p className="mode-select-tagline">Discover. Track. Save.</p>

                <h2>Choose how you would like to explore</h2>

                {/* let the user choose which data source to use */}
                <div className="mode-options">

                    {/* live mode retrieves game info fromt he rawg api */}
                    <article className="mode-card">
                        <span className="mode-status live-status">Live</span>
                        <h3>Live Mode</h3>

                        <p>
                            Search using real-time game information provided by the RAWG API.
                        </p>
                        
                        <p className="mode-note">
                            Availability depends on the external RAWG service.
                        </p>

                        <button
                            type="button"
                            onClick={() => handleModeSelection("live")}
                        >
                            Enter Live Mode
                        </button>
                    </article>

                    {/* demo mode uses local sample data when the api is unavailable */}
                    <article className="mode-card">
                        <span className="mode-status demo-status">Demo</span>

                        <h3>Demo Mode</h3>

                        <p>
                            Explore GameVault using built-in sample game data. 
                        </p>

                        <p className="mode-note">
                            Recommended while RAWG is unavailable.
                        </p>

                        <button
                            type="button"
                            onClick={() => handleModeSelection("demo")}
                        >
                            Enter Demo Mode
                        </button>
                    </article>

                </div>
            </section>
        </main>
    );
}

export default ModeSelect;