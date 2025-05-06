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
        <div className="scale-[0.95] origin-center">
            <div className="min-h-screen flex flex-col items-center justify-center gap-16">
                <Logo className="h-16" />

                <div className="relative">
                    <img src={LoginBox} className="mb-8 max-w-100 select-none" />

                    <form
                        onSubmit={handleSubmit}
                        className="absolute inset-0 flex flex-col items-center justify-center px-8"
                    >
                        <div className="w-full mb-8 relative px-20">
                            <input
                                type="text"
                                placeholder="Username"
                                value={form.username}
                                onChange={(e) => handleChange('username', e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                                className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-4 pl-2"
                                pattern={usernamePattern.source}
                                required
                            />
                            <FaUser className="absolute right-0 top-1/2 -translate-y-4 -translate-x-24 text-black" />
                            {touched.username && !isUsernameValid && (
                                <p className="mt-2 text-xs text-red-600 font-barlow">
                                    3-30 characters, must start with a letter.
                                </p>
                            )}
                        </div>

                        <div className="w-full mb-8 relative px-20">
                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                                className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-4 pl-2"
                                required
                            />
                            <FaEnvelope className="absolute right-0 top-1/2 -translate-y-4 -translate-x-24 text-black" />
                            {touched.email && !isEmailValid && (
                                <p className="mt-2 text-xs text-red-600 font-barlow">
                                    Enter a valid e-mail address.
                                </p>
                            )}
                        </div>

                        <div className="w-full mb-8 relative px-20">
                            <input
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                                className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-4 pl-2"
                                required
                            />
                            <FaLock className="absolute right-0 top-1/2 -translate-y-4 -translate-x-24 text-black" />
                            {touched.password && !isPwdValid && (
                                <p className="mt-2 text-xs text-red-600 font-barlow">
                                    Minimum 8 characters - at least 1 uppercase, 1 lowercase and 1
                                    digit.
                                </p>
                            )}
                        </div>

                        <div className="w-full mb-10 relative px-20">
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={form.confirm}
                                onChange={(e) => handleChange('confirm', e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                                className="w-full border-b-4 border-black placeholder-black placeholder:font-museo focus:outline-none pb-4 pl-2"
                                required
                            />
                            <FaLock className="absolute right-0 top-1/2 -translate-y-4 -translate-x-24 text-black" />
                            {touched.confirm && !isMatch && (
                                <p className="mt-2 text-xs text-red-600 font-barlow">
                                    Passwords do not match.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-12 rounded-full shadow transition-colors
                ${(!isFormValid || loading) && 'bg-yellow-500 opacity-40 cursor-not-allowed'}`}
                        >
                            {loading ? 'Creating…' : 'Create account'}
                        </button>

                        <p className="mt-4 text-xs font-museo text-gray-600">
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
