module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                barlow: ['Barlow', 'sans-serif'],
                museo: ['"MuseoModerno"', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
            },
            screens: {
                smPlus: '700px',
            },
        },
    },
    plugins: [],
};
