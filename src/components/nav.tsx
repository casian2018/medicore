import { useState, useEffect } from 'react';
import Link from 'next/link';

const checkAuth = async () => {
    try {
        const response = await fetch('/api/auth/checkAuth');
        return response.status === 200;
    } catch (error) {
        console.error('Error checking auth:', error);
        return false;
    }
};

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const isAuthenticated = await checkAuth();
            setIsLoggedIn(isAuthenticated);
        };
        fetchAuthStatus();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white border-gray-200 py-2.5 fixed w-full z-50 text-center">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <Link href="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap">
                        <img src="/logo.png" alt="Logo" width={75} />
                    </span>
                </Link>
                <div className="flex items-center lg:order-2">
                    <div className="hidden mt-2 mr-4 sm:inline-block">
                        <span></span>
                    </div>

                    {isLoggedIn ? (
                        <div>
                            <Link
                                href="/profile"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/pages/logout"
                                className="text-white ml-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none"
                            >
                                Log Out
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href="/pages/login"
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none"
                        >
                            Sign In
                        </Link>
                    )}
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="mobile-menu-2"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <svg className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-700 lg:p-0"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/pages/about"
                                className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-700 lg:p-0"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/talk"
                                className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-700 lg:p-0"
                            >
                                Diagnosis
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/forum"
                                className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-700 lg:p-0"
                            >
                                Forum
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/pages/contact"
                                className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-700 lg:p-0"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;