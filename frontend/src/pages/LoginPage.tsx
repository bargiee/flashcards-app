import { FormEvent, useState } from 'react';

import Logo from '../components/Logo';
import LoginBox from '../assets/LoginBox.svg';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // todo endpoint
        console.log({ email, password, remember });
    };

    return (
        <>
            <div className="scale-[0.95] origin-center">
                <div className="min-h-screen flex flex-col items-center justify-center gap-16">
                    <Logo className="h-16" />
                    <div className="relative">
                        <img src={LoginBox} className="mb-8 max-w-100" />

                        <form
                            onSubmit={handleSubmit}
                            className="absolute inset-0 flex flex-col items-center justify-center px-8"
                        >
                            <div className="w-full mb-12 relative px-20">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-4 pl-2"
                                    required
                                />
                                <FaEnvelope className="absolute right-0 top-1/2 transform -translate-y-4 -translate-x-24 text-black" />
                            </div>
                            <div className="w-full mb-4 relative px-20">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-4 pl-2"
                                    required
                                />
                                <FaLock className="absolute right-0 top-1/2 transform -translate-y-4 -translate-x-24 text-black" />
                            </div>

                            <div className="w-full flex justify-between items-center text-sm mb-6 px-20">
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
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-20 mt-8 rounded-full shadow"
                            >
                                Log in
                            </button>
                            <p className="mt-4 text-xs font-museo text-gray-600">
                                Don’t have an account?{' '}
                                <a href="#" className="text-yellow-400 hover:underline font-medium">
                                    Register
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
