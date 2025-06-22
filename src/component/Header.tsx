import { useState, useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

function Header() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div>
            <nav className="bg-blue-400 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 relative">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <svg
                                    className="h-8 w-8 text-blue-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                    />
                                </svg>
                                <span className="ml-2 text-xl font-bold">FinAnalyzer</span>
                            </div>
                        </div>

                        {/* Navigation - Center */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6">
                            <a href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500">
                                Home
                            </a>
                            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-blue-500">
                                About
                            </a>
                            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-blue-500">
                                Contact
                            </a>
                        </div>

                        {/* Dark Mode Toggle - Right */}
                        <div className="hidden md:block">
                            <button onClick={toggleDarkMode} className="text-white hover:text-yellow-300 transition">
                                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
