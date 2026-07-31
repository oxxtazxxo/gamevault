import './App.css'
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Footer from "./components/Footer.jsx";
import SparkleCursor from "./components/SparkleCursor";

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <Home />
            <Footer />

            <SparkleCursor />
        </div>
    );
}
export default App;