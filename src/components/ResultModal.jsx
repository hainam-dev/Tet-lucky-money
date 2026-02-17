import { useEffect } from 'react';
import { triggerFireworks, triggerMoneyRain } from '../utils/confetti';
import { playSound } from '../utils/sound';

export default function ResultModal({ winner, envelope, onKeep, onRedraw, canRedraw, isJackpot }) {
    const formatMoney = (val) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    };

    useEffect(() => {
        // Play sound and trigger effects
        if (isJackpot) {
            playSound('cheer');
            triggerFireworks();
        } else {
            playSound('open');
            triggerMoneyRain();
        }
    }, [isJackpot]);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-md rounded-3xl p-8 border-4 text-center shadow-[0_0_100px_rgba(234,179,8,0.5)] animate-zoom-in relative ${isJackpot ? 'bg-gradient-to-br from-red-600 to-yellow-600 border-yellow-300' : 'bg-red-700 border-yellow-500'}`}>

                {isJackpot && (
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-red-900 px-6 py-2 rounded-full font-black text-xl shadow-lg border-2 border-white animate-bounce">
                        🏆 GIẢI ĐẶC BIỆT 🏆
                    </div>
                )}

                <h2 className="text-3xl font-bold text-yellow-300 mb-2">Chúc Mừng</h2>
                <h3 className="text-4xl font-black text-white mb-6 uppercase">{winner?.name}</h3>

                <div className="my-8 transform scale-125">
                    <div className="text-yellow-100 text-lg mb-2">Bạn nhận được</div>
                    <div className={`text-5xl md:text-6xl font-black drop-shadow-md ${isJackpot ? 'text-white scale-110' : 'text-yellow-400'}`}>
                        {formatMoney(envelope.value)}
                    </div>
                </div>

                <div className="flex flex-col gap-3 mt-8">
                    <button
                        onClick={onKeep}
                        className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold text-xl rounded-xl shadow-lg"
                    >
                        NHẬN LÌ XÌ 💰
                    </button>

                    {canRedraw && (
                        <button
                            onClick={onRedraw}
                            className="w-full py-3 bg-red-800 hover:bg-red-900 text-red-200 border border-red-400 font-semibold rounded-xl"
                        >
                            QUAY XE (Chọn lại) 🔄
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
