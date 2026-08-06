import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SparkleCursor from "./components/SparkleCursor";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import GameDetails from "./pages/GameDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import ModeSelect from "./pages/ModeSelect";

function App() {

    // track the current page so the mode selection screen can use
    // a simplified layout without the apps navbar or footer

    const location = useLocation();

    const isModeSelectPage = location.pathname === "/";

    return (
        <>
            <SparkleCursor />

            <div className="app-container">

                {/* display the navbar after the user selects a mode. */}
                {!isModeSelectPage && <Navbar />}

                <Routes>
                    {/* let the user choose between live and demo */}
                    <Route path="/" element={<ModeSelect />} />

                    {/* both modes use the same shared homepage */}
                    <Route path="/home" element={<Home />} />

                    <Route
                        path="/favorites"
                        element={<Favorites />}
                    />

                    <Route 
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/game/:slug"
                        element={<GameDetails />}
                    />
                </Routes>

                {/* display the footer after the user selects a mode */}
                {!isModeSelectPage && <Footer />}
            </div>
        </>
    );
}

export default App;