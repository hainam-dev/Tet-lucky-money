import { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils/sound';

export default function PlayerWheel({ players, onSpinEnd }) {
    const [spinning, setSpinning] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [displayName, setDisplayName] = useState('???');
    const intervalRef = useRef(null);

    const startSpin = () => {
        if (spinning || hasWon) return;
        setSpinning(true);

        // Fast cycle animation
        let count = 0;
        const maxCount = 20 + Math.floor(Math.random() * 10); // Random spin duration
        const speed = 100;

        intervalRef.current = setInterval(() => {
            const randomIdx = Math.floor(Math.random() * players.length);
            setDisplayName(players[randomIdx].name);
            playSound('tick');
            count++;
        }, speed);

        // Stop after duration
        setTimeout(() => {
            clearInterval(intervalRef.current);
            playSound('spin-end');

            // Select final winner (filter out those who played if needed, but for now random from list)
            // Ideally App should filter out played players before passing to this component
            // But let's assume 'players' prop passed here are only eligible players.
            const finalIndex = Math.floor(Math.random() * players.length);
            const winner = players[finalIndex];
            setDisplayName(winner.name);
            setSpinning(false);
            setHasWon(true);

            // Small delay before notifying parent
            setTimeout(() => {
                onSpinEnd(winner);
            }, 2000); // Increased delay slightly to enjoy the effect

        }, 3000);
    };

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <div className={`w-64 h-64 md:w-80 md:h-80 bg-yellow-500 rounded-full border-8 border-yellow-200 flex items-center justify-center mb-8 relative overflow-hidden transition-all duration-500 ${hasWon ? 'scale-110 shadow-[0_0_100px_rgba(253,224,71,1)] ring-8 ring-white' : 'shadow-[0_0_50px_rgba(253,224,71,0.6)]'}`}>
                {/* Decorative inner circle */}
                <div className={`absolute w-56 h-56 border-4 border-dashed border-red-800 rounded-full opacity-30 ${spinning ? 'animate-spin' : 'animate-spin-slow'}`}></div>

                {hasWon && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-yellow-300 opacity-20 animate-pulse"></div>
                        <div className="absolute -inset-4 bg-gradient-to-tr from-transparent via-white to-transparent opacity-30 transform rotate-45 animate-victory-shine"></div>
                    </div>
                )}

                <h2 className={`text-4xl md:text-5xl font-black text-red-900 text-center px-4 relative z-10 ${hasWon ? 'animate-bounce drop-shadow-lg scale-125' : 'animate-pulse'}`}>
                    {displayName}
                </h2>
            </div>

            {!spinning && !hasWon && (
                <button
                    onClick={startSpin}
                    className="px-12 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-red-900 text-2xl font-bold shadow-lg hover:scale-105 transition-transform uppercase tracking-wider border-4 border-yellow-200"
                >
                    QUAY NGAY 🎲
                </button>
            )}

            {spinning && (
                <p className="text-yellow-200 animate-bounce mt-4 text-xl">Đang tìm người may mắn...</p>
            )}

            {hasWon && (
                <p className="text-yellow-300 font-bold text-2xl animate-pulse mt-4">Chúc mừng!</p>
            )}
        </div>
    );
}
