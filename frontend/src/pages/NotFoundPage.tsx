import { Link } from 'react-router-dom';
import Image from '../assets/404.png';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center text-center font-barlow mt-40">
            <div className="flex items-center justify-center gap-6">
                <h1 className="text-[7rem] font-bold">404</h1>
                <img src={Image} className="h-32 w-auto select-none" draggable={false} />
            </div>
            <h2 className="text-3xl font-bold mt-6">Page not found</h2>
            <p className="text-gray-600 mt-2 text-lg">
                The page you are looking for does not exist.
            </p>

            <Link
                to="/"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 mt-10 rounded-full shadow"
            >
                Go to Homepage
            </Link>
        </div>
    );
}
