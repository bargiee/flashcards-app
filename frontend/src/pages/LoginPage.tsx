import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import LoginBox from '../assets/LoginBox.svg';
import Logo from '../components/Logo';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const { isAuthenticated, isChecking, login } = useAuth();

    if (!isChecking && isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password, remember);
        } catch {
            toast.error('Invalid credentials');
        }
    };

    return (
        <>
            <div className="origin-center">
                <div className="min-h-screen flex flex-col items-center justify-center gap-16">
                    <Logo className="h-16 mb-12 sm:mb-0" />
                    <div className="relative">
                        <img src={LoginBox} className="mb-8 max-w-100 px-2" />

                        <form
                            onSubmit={handleSubmit}
                            className="absolute inset-0 flex flex-col items-center justify-center px-8"
                        >
                            <div className="w-full mb-4 relative px-5 sm:px-20 sm:mb-12">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-4 pl-2"
                                    required
                                />
                                <FaEnvelope className="absolute right-0 top-1/2 transform -translate-y-4 -translate-x-10 text-black sm:-translate-x-24" />
                            </div>
                            <div className="w-full relative px-5 sm:mb-4 sm:px-20">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-4 pl-2"
                                    required
                                />
                                <FaLock className="absolute right-0 top-1/2 transform -translate-y-4 -translate-x-10 text-black sm:-translate-x-24" />
                            </div>

                            <div className="w-full flex justify-between items-center text-sm mt-2 px-5 sm:mb-6 sm:px-20 sm:mt-0">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        className="h-4 w-4 accent-yellow-400"
                                    />
                                    <span className="ml-2 font-museo">Remember me</span>
                                </label>
                                <a
                                    href="#"
                                    className="font-museo hover:underline hover:text-yellow-500"
                                >
                                    Forgot Password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-20 mt-2 rounded-full shadow sm:mt-8"
                            >
                                Log in
                            </button>
                            <p className="mt-4 text-xs font-museo text-gray-600">
                                Don't have an account?{' '}
                                <a
                                    href="/signup"
                                    className="text-yellow-400 hover:underline font-medium"
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                    <span className=" font-barlow text-gray-300">
                        Revise smarter with flashcards
                    </span>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
