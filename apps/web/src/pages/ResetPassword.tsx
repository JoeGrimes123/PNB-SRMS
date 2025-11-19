import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import BackgroundGradients from "../components/BackgroundGradients";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            setError("Invalid reset link. Please request a new password reset.");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (!token) {
            setError("Invalid reset link");
            return;
        }

        setLoading(true);

        const { error } = await authClient.resetPassword({
            newPassword: password,
            token,
        });

        setLoading(false);

        if (error) {
            setError(error.message || "Failed to reset password");
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
                            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-white text-3xl font-semibold mb-4">Password Reset Successful</h2>
                            <p className="text-gray-400 mb-6">
                                Your password has been successfully reset. You can now log in with your new password.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded transition-colors"
                        >
                            Go to Login
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
                        className="text-white mb-4"
                        style={{
                            fontFamily: 'Actor, sans-serif',
                            fontSize: '80px',
                            lineHeight: '1.2',
                            fontWeight: 400
                        }}
                    >
                        Reset Password
                    </h1>

                    <p className="text-gray-400 mb-12 text-lg">
                        Enter your new password below.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-12">
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
                                New Password
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

                        {/* Confirm Password Input */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-[#999999] mb-2"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '24px',
                                    lineHeight: '1.21'
                                }}
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={8}
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !token}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '18px'
                            }}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>

                        {/* Link back to Login */}
                        <div className="text-center text-sm">
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                ← Back to Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
