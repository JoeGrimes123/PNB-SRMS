import { authClient } from "../lib/auth-client";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { data: session } = authClient.useSession();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await authClient.signOut();
        navigate("/login");
    };

    if (!session) {
        navigate("/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                PNB SRMS
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 dark:text-gray-300">
                                {session.user.name || session.user.email}
                            </span>
                            <button
                                onClick={handleSignOut}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Welcome to your Dashboard!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            This is a placeholder dashboard. Service request management features will be added here.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
