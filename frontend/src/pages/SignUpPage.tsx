import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoginBox from '../assets/LoginBox.svg';
import Logo from '../components/Logo';

const usernamePattern = /^[A-Za-z][A-Za-z0-9-]{2,29}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const pwdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export default function SignUpPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
    });
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (field: keyof typeof form, value: string) =>
        setForm((p) => ({ ...p, [field]: value }));

    const isUsernameValid = usernamePattern.test(form.username);
    const isEmailValid = emailPattern.test(form.email);
    const isPwdValid = pwdPattern.test(form.password);
    const isMatch = form.password === form.confirm;
    const isFormValid = isUsernameValid && isEmailValid && isPwdValid && isMatch;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { username, email, password } = form;
            await register(username, email, password);
            navigate('/home');
        } catch (err: any) {
            console.error(err);
            toast.error('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="origin-center">
            <div className="min-h-screen flex flex-col items-center justify-center gap-16">
                <Logo className="h-16 mb-12 sm:mb-0" />

                <div className="relative">
                    <img src={LoginBox} className="mb-8 max-w-100 select-none px-2" />

                    <form
                        onSubmit={handleSubmit}
                        className="absolute inset-0 flex flex-col items-center justify-center px-8"
                    >
                        <div className="w-full relative px-5 mb-2 sm:mb-8 sm:px-20">
                            <input
                                type="text"
                                placeholder="Username"
                                value={form.username}
                                onChange={(e) => handleChange('username', e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                                className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-2 pl-2 sm:pb-4"
                                pattern={usernamePattern.source}
                                required
                            />
                            <FaUser className="absolute right-0 top-1/2 -translate-y-4 -translate-x-10 text-black sm:-translate-x-24" />
                            {touched.username && !isUsernameValid && (
                                <p className="text-xs text-red-600 font-barlow sm:mt-2">
                                    3-30 characters, must start with a letter.
                                </p>
                            )}
                        </div>

                        <div className="w-full relative px-5 mb-2 sm:mb-8 sm:px-20">
                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                                className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-2 pl-2 sm:pb-4"
                                required
                            />
                            <FaEnvelope className="absolute right-0 top-1/2 -translate-y-4 -translate-x-10 text-black sm:-translate-x-24" />
                            {touched.email && !isEmailValid && (
                                <p className="text-xs text-red-600 font-barlow sm:mt-2">
                                    Enter a valid e-mail address.
                                </p>
                            )}
                        </div>

                        <div className="w-full relative px-5 mb-2 sm:mb-8 sm:px-20">
                            <input
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                                className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-2 pl-2 sm:pb-4"
                                required
                            />
                            <FaLock className="absolute right-0 top-1/2 -translate-y-4 -translate-x-10 text-black sm:-translate-x-24" />
                            {touched.password && !isPwdValid && (
                                <p className="text-xs text-red-600 font-barlow sm:mt-2">
                                    Minimum 8 characters - at least 1 uppercase, 1 lowercase and 1
                                    digit.
                                </p>
                            )}
                        </div>

                        <div className="w-full relative px-5 mb-1 sm:px-20 sm-mb-8">
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={form.confirm}
                                onChange={(e) => handleChange('confirm', e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                                className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-2 pl-2 sm:pb-4"
                                required
                            />
                            <FaLock className="absolute right-0 top-1/2 -translate-y-4 -translate-x-10 text-black sm:-translate-x-24" />
                            {touched.confirm && !isMatch && (
                                <p className="text-xs text-red-600 font-barlow sm:mt-2">
                                    Passwords do not match.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1 px-10 rounded-full shadow transition-colors mt-2 sm:mt-8 sm:py-2 sm:px-12
                ${(!isFormValid || loading) && 'bg-yellow-500 opacity-40 cursor-not-allowed'}`}
                        >
                            {loading ? 'Creating…' : 'Create account'}
                        </button>

                        <p className="mt-1 text-xs font-museo text-gray-600 md:mt-4">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="text-yellow-400 hover:underline font-medium"
                            >
                                Log in
                            </a>
                        </p>
                    </form>
                </div>

                <span className="font-barlow text-gray-300">Revise smarter with flashcards</span>
            </div>
        </div>
    );
}
