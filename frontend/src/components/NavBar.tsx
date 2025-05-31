import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { FaHome, FaFolder, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import Logo from './Logo';

const NavBar = () => {
    const location = useLocation();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const { logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { to: '/home', icon: <FaHome />, label: 'Home' },
        { to: '/library', icon: <FaFolder />, label: 'Library' },
        { to: '/create', icon: <FaPlus className="text-sm" />, label: 'Create new' },
    ];

    return (
        <nav className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between px-8 py-4 font-barlow">
            <div className="flex w-full items-center justify-between sm:w-auto sm:justify-start">
                <Logo className="h-10 min-w-[6rem]" />

                <button
                    onClick={logout}
                    className="font-semibold text-red-black hover:text-red-400 sm:hidden"
                >
                    Logout
                </button>
            </div>
            <div className="flex justify-center text-lg mt-4 sm:mt-0 sm:justify-center w-full">
                {navItems.map(({ to, icon, label }) => {
                    const active = isActive(to);
                    const isHovered = hoveredLink && hoveredLink !== to;

                    const baseClasses =
                        'flex items-center gap-1 font-semibold px-8 rounded-full transition-all md:gap-2 whitespace-nowrap';

                    const activeClasses =
                        active && !isHovered
                            ? 'bg-yellow-400 text-black px-8 py-1 whitespace-nowrap sm:px-8 md:px-12 lg:px-16'
                            : '';

                    const hoverClasses = !active
                        ? 'hover:bg-yellow-400 hover:text-black hover:px-8  hover:py-1 md:hover:px-12 lg:hover:px-16 whitespace-nowrap'
                        : '';

                    return (
                        <Link
                            key={to}
                            to={to}
                            onMouseEnter={() => setHoveredLink(to)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className={`${baseClasses} ${activeClasses} ${hoverClasses}`}
                        >
                            {icon}
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </div>
            <button
                onClick={logout}
                className="hidden sm:block font-semibold text-red-black hover:text-red-400"
            >
                Logout
            </button>
        </nav>
    );
};

export default NavBar;
