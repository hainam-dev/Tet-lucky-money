export default function EnvelopeGrid({ envelopes, onPick }) {
    // Only show unpicked envelopes
    const availableEnvelopes = envelopes.filter(e => !e.picked);

    return (
        <div className="w-full max-w-4xl">
            <h2 className="text-3xl text-yellow-300 font-bold text-center mb-6">
                Chọn Bao Lì Xì Của Bạn 🧧
            </h2>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 p-4">
                {availableEnvelopes.map((env) => (
                    <button
                        key={env.id}
                        onClick={() => onPick(env)}
                        className="w-32 md:w-40 aspect-[3/4] bg-red-600 rounded-xl border-2 border-yellow-500 shadow-lg hover:shadow-yellow-500/50 transform hover:-translate-y-2 transition-all flex flex-col items-center justify-center relative overflow-hidden group"
                    >
                        {/* Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-yellow-900"></div>

                        {/* Coin Icon */}
                        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-yellow-200 mb-2 group-hover:scale-110 transition-transform shadow-inner">
                            <span className="text-red-800 text-2xl font-bold">福</span>
                        </div>

                        <span className="text-yellow-200 font-semibold text-lg">Lì Xì Tết</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
