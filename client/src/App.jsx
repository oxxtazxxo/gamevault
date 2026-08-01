import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SparkleCursor from "./components/SparkleCursor";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import GameDetails from "./pages/GameDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
    return (
        <>
            <SparkleCursor />

            <div className="app-container">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/game/:slug" element={<GameDetails />} />
                </Routes>

                <Footer />
            </div>
        </>
    );
}

export default App;