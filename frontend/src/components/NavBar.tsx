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
        <nav className="flex items-center justify-between px-8 py-4 font-barlow">
            <Logo className="h-10" />

            <div className="flex items-center justify-center text-lg">
                {navItems.map(({ to, icon, label }) => {
                    const active = isActive(to);
                    const isHovered = hoveredLink && hoveredLink !== to;

                    const baseClasses =
                        'flex items-center gap-2 font-semibold px-12 rounded-full transition-all';

                    const activeClasses =
                        active && !isHovered ? 'bg-yellow-400 text-black px-20 py-1' : '';

                    const hoverClasses = !active
                        ? 'hover:bg-yellow-400 hover:text-black hover:px-20 hover:py-1'
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
            <button onClick={logout} className="font-semibold text-red-black hover:text-red-400">
                Logout
            </button>
        </nav>
    );
};

export default NavBar;
