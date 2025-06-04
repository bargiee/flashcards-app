import { Link } from 'react-router-dom';
import { FaRegClock, FaChartLine, FaLaptop } from 'react-icons/fa';
import { FeatureCard } from '../components/FeatureCard';
import Logo from '../components/Logo';

export default function StartPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <header className="flex items-center justify-between py-4 px-8">
                <Logo className="h-10" />
                <nav className="flex gap-4 font-barlow pl-2">
                    <Link
                        to="/login"
                        className="self-center hover:underline text-lg hover:text-yellow-500"
                    >
                        Log&nbsp;In
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-yellow-400 hover:bg-yellow-500 px-5 py-1.5 rounded-full text-lg font-semibold shadow"
                    >
                        Sign&nbsp;Up
                    </Link>
                </nav>
            </header>

            <section className="text-center mt-8 px-4">
                <h1 className="font-museo text-3xl sm:text-4xl font-bold">
                    Welcome to&nbsp;reMind
                </h1>
                <p className="font-barlow mt-4 text-lg max-w-xl mx-auto px-16">
                    Revise smarter, not harder - create, organize and master flashcards with ease.
                </p>
            </section>

            <section className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16 px-4">
                <FeatureCard
                    icon={<FaRegClock />}
                    title="Spaced repetition"
                    text="Learn more effectively using scientifically proven memory techniques."
                />
                <FeatureCard
                    icon={<FaChartLine />}
                    title="Progress tracking"
                    text="Visualize your learning journey and stay motivated."
                    variant="black"
                />
                <FeatureCard
                    icon={<FaLaptop />}
                    title="Study anywhere"
                    text="Access your flashcards from any device, anytime."
                    variant="yellow"
                />
            </section>

            <section className="mt-14 4xl:mt-20 mb-14 text-center">
                <p className="font-barlow mb-6 text-sm sm:text-base">
                    Get started today and boost your memory with&nbsp;reMind
                </p>
                <Link
                    to="/signup"
                    className="bg-yellow-400 hover:bg-yellow-500 px-10 py-2.5 rounded-full font-semibold shadow"
                >
                    Sign&nbsp;Up
                </Link>
            </section>
        </main>
    );
}
