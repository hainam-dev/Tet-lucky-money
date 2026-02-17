import { useState } from 'react'
import SetupScreen from './components/SetupScreen'
import PlayerWheel from './components/PlayerWheel'
import EnvelopeGrid from './components/EnvelopeGrid'
import ResultModal from './components/ResultModal'

const PHASES = {
  SETUP: 'SETUP',
  SPIN: 'SPIN',
  PICK: 'PICK',
  RESULT: 'RESULT',
  FINISHED: 'FINISHED',
}

function App() {
  const [phase, setPhase] = useState(PHASES.SETUP)
  const [players, setPlayers] = useState([])
  const [envelopes, setEnvelopes] = useState([])

  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [selectedEnvelope, setSelectedEnvelope] = useState(null)

  // Track if current player has redrawn (max 1 redraw per player as per requirements)
  const [hasRedrawn, setHasRedrawn] = useState(false)

  const handleStartGame = (inputPlayers, inputEnvelopes) => {
    // Shuffle players and envelopes initially
    const shuffledPlayers = [...inputPlayers].sort(() => Math.random() - 0.5)
    // Map players to object to track status
    const playerObjects = shuffledPlayers.map(name => ({ name, hasPlayed: false }))

    // Shuffle envelopes
    const shuffledEnvelopes = [...inputEnvelopes].sort(() => Math.random() - 0.5)

    setPlayers(playerObjects)
    setEnvelopes(shuffledEnvelopes)
    setPhase(PHASES.SPIN)
  }

  // Filter players who haven't played yet
  const eligiblePlayers = players.filter(p => !p.hasPlayed)

  const handleSpinEnd = (winner) => {
    setCurrentPlayer(winner)
    setHasRedrawn(false) // Reset redraw status for new player
    setPhase(PHASES.PICK)
  }

  const handleEnvelopePick = (env) => {
    setSelectedEnvelope(env)
    setPhase(PHASES.RESULT)
  }

  const handleKeepResult = () => {
    // Mark envelope as picked
    let newEnvelopes = envelopes.map(e =>
      e.id === selectedEnvelope.id ? { ...e, picked: true } : e
    )

    // Shuffle remaining envelopes to randomize positions for next turn
    newEnvelopes = newEnvelopes.sort(() => Math.random() - 0.5)

    setEnvelopes(newEnvelopes)

    // Mark player as played
    const newPlayers = players.map(p =>
      p.name === currentPlayer.name ? { ...p, hasPlayed: true } : p
    )
    setPlayers(newPlayers)

    // Check if game over
    const remainingPlayers = newPlayers.filter(p => !p.hasPlayed)
    const remainingEnvelopes = newEnvelopes.filter(e => !e.picked)

    if (remainingPlayers.length === 0 || remainingEnvelopes.length === 0) {
      setPhase(PHASES.FINISHED)
    } else {
      setPhase(PHASES.SPIN)
    }

    setSelectedEnvelope(null)
    setCurrentPlayer(null)
  }

  const handleRedraw = () => {
    // Just return to PICK phase, envelope remains unpicked in state
    setHasRedrawn(true)
    setSelectedEnvelope(null)
    setPhase(PHASES.PICK)
  }

  const handleReset = () => {
    if (confirm('Bạn có chắc muốn reset game không?')) {
      setPhase(PHASES.SETUP)
      setPlayers([])
      setEnvelopes([])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-800 to-red-900 text-yellow-400 flex flex-col items-center p-4 font-sans overflow-hidden">
      <header className="w-full flex justify-between items-center p-2 relative z-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-yellow-300 uppercase drop-shadow-md">
          🧨 Lì Xì Tết
        </h1>
        {phase !== PHASES.SETUP && (
          <button onClick={handleReset} className="text-xs text-red-300 hover:text-white underline">
            Reset Game
          </button>
        )}
      </header>

      <div className="w-full flex-1 flex flex-col items-center justify-center relative">
        {phase === PHASES.SETUP && (
          <SetupScreen onStart={handleStartGame} />
        )}

        {phase === PHASES.SPIN && (
          <div className="text-center w-full">
            <div className="mb-4 text-yellow-200/80 text-sm">
              Còn lại: {eligiblePlayers.length} người | {envelopes.filter(e => !e.picked).length} bao
            </div>
            <PlayerWheel players={eligiblePlayers} onSpinEnd={handleSpinEnd} />
          </div>
        )}

        {phase === PHASES.PICK && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="mb-4 text-center">
              <p className="text-yellow-200">Lượt của:</p>
              <h2 className="text-3xl font-bold text-white animate-pulse">{currentPlayer?.name}</h2>
              {hasRedrawn && <span className="text-xs text-red-300 bg-red-900 px-2 py-1 rounded">(Đã chọn lại)</span>}
            </div>
            <EnvelopeGrid envelopes={envelopes} onPick={handleEnvelopePick} />
          </div>
        )}

        {phase === PHASES.RESULT && selectedEnvelope && (
          <ResultModal
            winner={currentPlayer}
            envelope={selectedEnvelope}
            onKeep={handleKeepResult}
            onRedraw={handleRedraw}
            canRedraw={!hasRedrawn}
            isJackpot={selectedEnvelope.value === Math.max(...envelopes.map(e => e.value))}
          />
        )}

        {phase === PHASES.FINISHED && (
          <div className="text-center bg-white/10 p-10 rounded-3xl backdrop-blur">
            <h2 className="text-5xl font-bold text-yellow-300 mb-4">HẾT LÌ XÌ RỒI! 💸</h2>
            <p className="text-xl text-white mb-8">Chúc mọi người năm mới phát tài!</p>
            <button onClick={handleReset} className="px-8 py-3 bg-yellow-500 text-red-900 font-bold rounded-xl shadow-lg hover:scale-105 transition">
              CHƠI LẠI TỪ ĐẦU
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
