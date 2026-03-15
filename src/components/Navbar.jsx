import { motion } from 'framer-motion';
import { getLevelInfo } from '../data/gameData';
import { XPBar, LevelBadge } from './shared/XPBar';

const NAV_ITEMS = [
    { view: 'dashboard', label: 'MAP', icon: '🗺' },
    { view: 'reference', label: 'DATABASE', icon: '📡' },
    { view: 'profile', label: 'PROFILE', icon: '👾' },
    { view: 'leaderboard', label: 'LEADERBOARD', icon: '🏆' },
];

export default function Navbar({ view, player, dispatch }) {
    const { current } = getLevelInfo(player.xp);

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 100,
            background: 'rgba(13, 17, 23, 0.92)',
            borderBottom: '1px solid rgba(57,255,20,0.2)',
            backdropFilter: 'blur(12px)',
            padding: '0.6rem 1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '1rem',
        }}>
            {/* Logo */}
            <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })}
            >
                <span style={{ fontSize: '1.4rem' }}>⚡</span>
                <div className="pixel neon-text" style={{ fontSize: '0.65rem' }}>
                    GitQuest
                </div>
                <span className="badge badge-neon" style={{ fontSize: '0.5rem', padding: '0.15rem 0.5rem' }}>
                    v2.0
                </span>
            </div>

            {/* Navigation Links */}
            <div style={{ display: 'flex', gap: '0.25rem' }}>
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.view}
                        onClick={() => dispatch({ type: 'SET_VIEW', payload: item.view })}
                        style={{
                            background: view === item.view ? 'var(--neon-dim)' : 'transparent',
                            border: `1px solid ${view === item.view ? 'var(--neon)' : 'transparent'}`,
                            borderRadius: '6px',
                            padding: '0.4rem 0.8rem',
                            color: view === item.view ? 'var(--neon)' : 'var(--text-dim)',
                            fontFamily: 'var(--font-code)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex', alignItems: 'center', gap: '0.35rem',
                        }}
                    >
                        <span>{item.icon}</span>
                        <span className="hide-mobile">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Player info */}
            <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'SET_VIEW', payload: 'profile' })}
            >
                <div style={{ textAlign: 'right' }} className="hide-mobile">
                    <div style={{ color: 'var(--gold)', fontSize: '0.72rem', fontWeight: 700 }}>
                        {player.xp.toLocaleString()} XP
                    </div>
                    <div className="dim-text" style={{ fontSize: '0.62rem' }}>{current.title}</div>
                </div>
                <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--neon-dim)',
                    border: '1.5px solid var(--neon)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem',
                    boxShadow: 'var(--glow-neon)',
                }}>
                    {player.avatar}
                </div>
                <LevelBadge xp={player.xp} />
            </div>
        </nav>
    );
}
