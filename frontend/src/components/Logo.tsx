import { Link } from 'react-router-dom';
import LogoImage from '../assets/logo.svg';

interface LogoProps {
    className?: string;
}

const Logo = ({ className = 'h-10' }: LogoProps) => {
    return (
        <Link to="/">
            <img src={LogoImage} alt="App Logo" className={`${className} w-auto`} />
        </Link>
    );
};

export default Logo;
