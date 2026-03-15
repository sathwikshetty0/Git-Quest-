import { useReducer, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gameReducer, initialState } from './state/gameState';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import MissionScreen from './components/MissionScreen';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';

const STORAGE_KEY = 'gitquest_v2_state';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      // merge saved player into fresh initial state
      return { ...initialState, player: { ...initialState.player, ...saved.player } };
    }
  } catch (_) { }
  return initialState;
}

const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadState);

  // Persist player to localStorage on every player change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ player: state.player }));
    } catch (_) { }
  }, [state.player]);

  const {
    view, activeMissionId, missionPhase,
    activeChallengeIndex, currentMissionXP, earnedBadge, player,
  } = state;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Background decoration — always behind */}
      <BackgroundDecor />

      {/* NAVBAR — hidden only during active mission */}
      {view !== 'mission' && (
        <Navbar view={view} player={player} dispatch={dispatch} />
      )}

      {/* Mission progress strip */}
      {view === 'mission' && (
        <MissionProgressStrip missionPhase={missionPhase} dispatch={dispatch} />
      )}

      {/* Main content area */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div key="dashboard" {...PAGE_TRANSITION}>
              <Dashboard player={player} dispatch={dispatch} />
            </motion.div>
          )}

          {view === 'mission' && activeMissionId && (
            <motion.div key="mission" {...PAGE_TRANSITION}>
              <MissionScreen
                activeMissionId={activeMissionId}
                missionPhase={missionPhase}
                activeChallengeIndex={activeChallengeIndex}
                currentMissionXP={currentMissionXP}
                earnedBadge={earnedBadge}
                dispatch={dispatch}
              />
            </motion.div>
          )}

          {view === 'leaderboard' && (
            <motion.div key="leaderboard" {...PAGE_TRANSITION}>
              <Leaderboard player={player} />
            </motion.div>
          )}

          {view === 'profile' && (
            <motion.div key="profile" {...PAGE_TRANSITION}>
              <Profile player={player} dispatch={dispatch} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function MissionProgressStrip({ missionPhase, dispatch }) {
  const pct = missionPhase === 'briefing' ? 20 : missionPhase === 'challenge' ? 60 : 100;
  const label = missionPhase === 'briefing' ? 'Phase 1/3: BRIEFING'
    : missionPhase === 'challenge' ? 'Phase 2/3: CHALLENGE'
      : 'Phase 3/3: REWARD';

  return (
    <div style={{
      padding: '0.45rem 1.5rem',
      background: 'rgba(13,17,23,0.98)',
      borderBottom: '1px solid rgba(255,77,77,0.25)',
      display: 'flex', alignItems: 'center', gap: '1rem',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <button
        onClick={() => dispatch({ type: 'RETURN_TO_DASHBOARD' })}
        style={{
          background: 'none', border: '1px solid #444', borderRadius: '4px',
          color: 'var(--text-dim)', fontFamily: 'var(--font-code)',
          fontSize: '0.7rem', padding: '0.2rem 0.6rem', cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        ← EXIT
      </button>
      <span className="dim-text" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>MISSION IN PROGRESS</span>
      <div style={{ flex: 1, height: '4px', background: 'rgba(255,77,77,0.12)', borderRadius: '2px' }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: pct === 100 ? 'var(--neon)' : 'var(--red)',
          borderRadius: '2px', transition: 'width 0.6s ease',
          boxShadow: pct === 100 ? 'var(--glow-neon)' : '0 0 6px var(--red)',
        }} />
      </div>
      <span className="dim-text" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
    }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(57,255,20,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(57,255,20,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />
      {/* Radial glows */}
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(57,255,20,0.05) 0%, transparent 65%)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(88,166,255,0.05) 0%, transparent 65%)',
        borderRadius: '50%',
      }} />
    </div>
  );
}
