/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 8s linear infinite',
                'zoom-in': 'zoomIn 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards',
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'victory-shine': 'shine 1.5s ease-in-out infinite',
            },
            keyframes: {
                zoomIn: {
                    '0%': { opacity: '0', transform: 'scale(0.5)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shine: {
                    '0%': { transform: 'translateX(-150%) rotate(45deg)' },
                    '100%': { transform: 'translateX(150%) rotate(45deg)' },
                }
            }
        },
    },
    plugins: [],
}
