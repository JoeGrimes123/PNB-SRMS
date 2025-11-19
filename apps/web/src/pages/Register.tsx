import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import BackgroundGradients from "../components/BackgroundGradients";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: "http://localhost:5173/login",
        });

        setLoading(false);

        if (error) {
            setError(error.message || "Failed to create account");
        } else {
            setSuccess(true);
        }
    };

    if (success) {
        return (
            <>
                <BackgroundGradients />
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="w-full max-w-md text-center">
                        <div className="mb-8">
                            <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-white text-3xl font-semibold mb-4">Check Your Email</h2>
                            <p className="text-gray-400 mb-2">
                                We've sent a verification link to:
                            </p>
                            <p className="text-white font-medium mb-6">{email}</p>
                            <p className="text-gray-400 text-sm">
                                Click the link in the email to verify your account.
                                <br />
                                (Check your terminal console for the verification link)
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Return to Login
                        </button>
                    </div>
                </div>
            </>
        );
    }

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
                        Sign Up
                    </h1>

                    {/* Register Form */}
                    <form onSubmit={handleRegister} className="space-y-12">
                        {/* Name Input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-[#999999] mb-2"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '24px',
                                    lineHeight: '1.21'
                                }}
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-transparent border-b border-white text-white text-xl py-2 focus:outline-none focus:border-purple-500 transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            />
                        </div>

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
                                minLength={8}
                                className="w-full bg-transparent border-b border-white text-white text-xl py-2 focus:outline-none focus:border-purple-500 transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            />
                            <p className="text-gray-500 text-xs mt-1">At least 8 characters</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-400 text-sm bg-red-900/20 border border-red-500/50 rounded px-4 py-2">
                                {error}
                            </div>
                        )}

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '18px'
                            }}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                        {/* Link to Login */}
                        <div className="text-center text-sm">
                            <span className="text-[#999999]">Already have an account? </span>
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
