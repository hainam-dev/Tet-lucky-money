import { useState } from 'react';
import { initAudio } from '../utils/sound';

export default function SetupScreen({ onStart }) {
    const [playerInput, setPlayerInput] = useState('');
    const [envelopeConfig, setEnvelopeConfig] = useState([
        { value: '10000', count: 1 },
        { value: '20000', count: 1 },
        { value: '50000', count: 1 },
    ]);

    const handleStart = () => {
        // Initialize audio context on user interaction to support Safari
        initAudio();

        const players = playerInput
            .split('\n')
            .map((p) => p.trim())
            .filter((p) => p);

        if (players.length === 0) {
            alert('Vui lòng nhập ít nhất 1 người chơi!');
            return;
        }

        const envelopes = [];
        envelopeConfig.forEach((cfg) => {
            for (let i = 0; i < cfg.count; i++) {
                envelopes.push({
                    id: Math.random().toString(36).substr(2, 9),
                    value: parseInt(cfg.value) || 0,
                    picked: false,
                });
            }
        });

        if (envelopes.length === 0) {
            alert('Vui lòng nhập ít nhất 1 bao lì xì!');
            return;
        }

        onStart(players, envelopes);
    };

    const updateEnvelopeConfig = (index, field, val) => {
        const newConfig = [...envelopeConfig];
        newConfig[index][field] = val;
        setEnvelopeConfig(newConfig);
    };

    const addEnvelopeType = () => {
        setEnvelopeConfig([...envelopeConfig, { value: '', count: 1 }]);
    };

    const removeEnvelopeType = (index) => {
        setEnvelopeConfig(envelopeConfig.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4 text-center">🧧 Thiết lập lì xì 🧧</h2>

            {/* Players Input */}
            <div className="mb-6">
                <label className="block text-yellow-200 mb-2 font-semibold">Danh sách người chơi (mỗi dòng 1 tên):</label>
                <textarea
                    className="w-full p-3 rounded-lg bg-red-900/50 border border-yellow-600 text-white placeholder-red-300 focus:outline-none focus:border-yellow-400"
                    rows="5"
                    placeholder="Nam&#10;Tin&#10;Bo..."
                    value={playerInput}
                    onChange={(e) => setPlayerInput(e.target.value)}
                />
                <div className="text-right text-sm text-yellow-200 mt-1">
                    {playerInput.split('\n').filter(p => p.trim()).length} người chơi
                </div>
            </div>

            {/* Envelopes Input */}
            <div className="mb-6">
                <label className="block text-yellow-200 mb-2 font-semibold">Cấu hình lì xì:</label>
                <div className="space-y-3">
                    {envelopeConfig.map((cfg, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <input
                                type="number"
                                placeholder="Giá trị (VNĐ)"
                                className="flex-1 p-2 rounded bg-red-900/50 border border-yellow-600 text-white focus:border-yellow-400"
                                value={cfg.value}
                                onChange={(e) => updateEnvelopeConfig(idx, 'value', e.target.value)}
                            />
                            <span className="text-yellow-200">x</span>
                            <input
                                type="number"
                                placeholder="SL"
                                className="w-16 p-2 rounded bg-red-900/50 border border-yellow-600 text-white focus:border-yellow-400"
                                value={cfg.count}
                                onChange={(e) => updateEnvelopeConfig(idx, 'count', e.target.value)}
                            />
                            <button
                                onClick={() => removeEnvelopeType(idx)}
                                className="text-red-400 hover:text-red-200 font-bold px-2"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={addEnvelopeType}
                    className="mt-3 text-sm text-yellow-300 hover:text-yellow-100 underline"
                >
                    + Thêm loại lì xì
                </button>
            </div>

            <button
                onClick={handleStart}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold rounded-xl text-lg shadow-lg transform active:scale-95 transition-all"
            >
                BẮT ĐẦU CHƠI 🚀
            </button>
        </div>
    );
}
