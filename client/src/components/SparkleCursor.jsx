import { useEffect, useState } from "react";
import "../styles/SparkleCursor.css";

function SparkleCursor() {

    // stores the current mouse position so the sparkle effect can follow the user's cursor.
    const [mouse, setMouse] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    });

    useEffect(() => {
        // updates the mouse position whenever the cursor moves.
        const handleMouseMove = (event) => {
            setMouse({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            className="sparkle-cursor"
            style={{
                "--mouse-x": `${mouse.x}px`,
                "--mouse-y": `${mouse.y}px`,
            }}
        />
    );
}

export default SparkleCursor;