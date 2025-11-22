import { useEffect, useRef, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Game() {
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(30)
  const [running, setRunning] = useState(false)
  const [leaderboard, setLeaderboard] = useState([])
  const targetRef = useRef(null)

  useEffect(() => {
    fetch(`${baseUrl}/api/scores`).then(r => r.json()).then(d => setLeaderboard(d.items || [])).catch(() => {})
  }, [])

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => setTime(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [running])

  useEffect(() => {
    if (time <= 0 && running) {
      setRunning(false)
      const name = prompt('Time up! Enter your name for the leaderboard:') || 'Player'
      fetch(`${baseUrl}/api/scores`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ player: name, points: score, mode: 'arcade' }) })
        .then(() => fetch(`${baseUrl}/api/scores`).then(r => r.json()).then(d => setLeaderboard(d.items || [])))
        .catch(()=>{})
    }
  }, [time, running, score])

  const start = () => { setScore(0); setTime(30); setRunning(true) }
  const moveTarget = () => {
    if (!targetRef.current) return
    const parent = targetRef.current.parentElement
    const maxX = parent.clientWidth - 60
    const maxY = parent.clientHeight - 60
    const x = Math.random() * maxX
    const y = Math.random() * maxY
    targetRef.current.style.transform = `translate(${x}px, ${y}px)`
  }

  const hit = () => { setScore(s => s + 1); moveTarget() }

  return (
    <section id="game" className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Catch the Gift</h3>
              <div className="text-sm text-slate-600">Time: <span className="font-semibold">{time}s</span></div>
            </div>
            <div className="relative h-[360px] rounded-lg bg-white border overflow-hidden select-none">
              {!running && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button onClick={start} className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Start</button>
                </div>
              )}
              <div className="absolute top-2 left-2 text-sm bg-slate-900 text-white rounded px-2 py-1">Score: {score}</div>
              <button ref={targetRef} onClick={hit} className="absolute size-12 rounded-full bg-pink-600 shadow-lg hover:scale-105 transition-transform" style={{ transform: 'translate(40px, 40px)' }} />
            </div>
            <p className="mt-3 text-slate-600 text-sm">Click the moving gift as many times as you can in 30 seconds. Top scores may unlock surprise discounts!</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Leaderboard</h3>
            <ol className="space-y-2">
              {leaderboard.length === 0 && <p className="text-slate-600">No scores yet. Be the first!</p>}
              {leaderboard.map((s, i) => (
                <li key={s.id || i} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-slate-800">{i+1}. {s.player}</span>
                  <span className="font-semibold text-slate-900">{s.points}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Game
