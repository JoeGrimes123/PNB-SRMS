import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import BackgroundGradients from "../components/BackgroundGradients";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await authClient.signIn.email({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            if (error.message?.includes("not verified")) {
                setError("Please verify your email before logging in. Check your console for the verification link.");
            } else {
                setError(error.message || "Failed to sign in");
            }
        } else {
            // Redirect to dashboard or home
            navigate("/dashboard");
        }
    };

    return (
        <>
            <BackgroundGradients />
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    {/* Title */}
                    <h1
                        className="text-white mb-12"
                        style={{
                            fontFamily: 'Actor, sans-serif',
                            fontSize: '96px',
                            lineHeight: '1.2',
                            fontWeight: 400
                        }}
                    >
                        Login
                    </h1>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-12">
                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-[#999999] mb-2"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '24px',
                                    lineHeight: '1.21'
                                }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-transparent border-b border-white text-white text-xl py-2 focus:outline-none focus:border-purple-500 transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-[#999999] mb-2"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '24px',
                                    lineHeight: '1.21'
                                }}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-transparent border-b border-white text-white text-xl py-2 focus:outline-none focus:border-purple-500 transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-400 text-sm bg-red-900/20 border border-red-500/50 rounded px-4 py-2">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '18px'
                            }}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        {/* Links */}
                        <div className="flex justify-between text-sm">
                            <button
                                type="button"
                                onClick={() => navigate("/forgot-password")}
                                className="text-[#999999] hover:text-white transition-colors"
                            >
                                Forgot Password?
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/register")}
                                className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
