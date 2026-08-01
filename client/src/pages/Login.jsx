import { useState } from "react";
import { loginUser, registerUser } from "../services/authApi";

function Login() {

    // Store the user's login credentials.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Send the user's credentials to the authentication server.
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const data = await loginUser({
                username,
                password,
            });

            // Save the JWT token.
            localStorage.setItem("token", data.token);

            // Save the logged-in user's information.
            localStorage.setItem("user", JSON.stringify(data.user));

            console.log("Logged in!", data);

            // Redirect to the profile page.
            window.location.href = "/profile";

        } catch (error) {
            console.error(error);
        }
    }

    // Handle user registration.
    async function handleRegister() {

        try {

            const result = await registerUser({

                username,
                password,

            });

            console.log("Registration successful!", result);

            alert("Account created successfully! You can now log in.");

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

    return (
        <main className="login-page">
            <section className="login-card">

                <h1>Welcome Back</h1>

                <p>
                    Continue your GameVault journey.
                </p>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p className="register-text">
                    Don't have an account?
                </p>

                <button
                    className="register-button"
                    type="button"
                    onClick={handleRegister}
                >
                    Create Account
                </button>

            </section>
        </main>
    );
}

export default Login;