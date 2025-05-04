import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFolder, FaUser, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import Logo from './Logo';

const NavBar = () => {
    const location = useLocation();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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

            <Link to="/profile" className="text-2xl hover:text-yellow-500">
                <FaUser />
            </Link>
        </nav>
    );
};

export default NavBar;
