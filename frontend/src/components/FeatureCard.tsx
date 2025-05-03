import { ReactNode } from 'react';

export type CardVariant = 'white' | 'black' | 'yellow';

interface Props {
    title: string;
    text: string;
    variant?: CardVariant;
    icon?: ReactNode;
}

export const FeatureCard = ({ title, text, variant = 'white', icon }: Props) => {
    const base =
        'flex flex-col items-center justify-center text-center rounded-[2rem] w-72 h-96 px-8 gap-2 ' +
        'transition-transform duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105';

    const variants: Record<CardVariant, string> = {
        white: 'bg-white border-2 border-black text-black',
        black: 'bg-black text-white',
        yellow: 'bg-yellow-400 text-black',
    };

    return (
        <div className={`${base} ${variants[variant]}`}>
            {icon && <div className="mb-4 text-4xl">{icon}</div>}
            <h3 className="font-museo text-2xl font-semibold mb-4">{title}</h3>
            <p className="font-barlow text-base leading-snug">{text}</p>
        </div>
    );
};
