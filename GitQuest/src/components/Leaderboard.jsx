import { motion } from 'framer-motion';
import { MOCK_LEADERBOARD, getLevelInfo } from '../data/gameData';

export default function Leaderboard({ player }) {
    // Inject the current player
    const { current } = getLevelInfo(player.xp);
    const playerEntry = {
        rank: '?',
        avatar: player.avatar,
        username: player.username,
        xp: player.xp,
        badges: player.badges.length,
        isPlayer: true,
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>
            <div className="pixel neon-text text-center mb-6" style={{ fontSize: '0.8rem' }}>
                ◈ LEADERBOARD ◈
            </div>

            <div className="glass">
                {/* Header */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '50px 1fr 1fr 100px 80px',
                    padding: '0.75rem 1.5rem', borderBottom: '1px solid rgba(57,255,20,0.2)',
                    color: 'var(--text-dim)', fontSize: '0.72rem', textTransform: 'uppercase',
                }}>
                    <span>RANK</span>
                    <span>PLAYER</span>
                    <span>XP</span>
                    <span style={{ textAlign: 'center' }}>BADGES</span>
                    <span style={{ textAlign: 'right' }}>LEVEL</span>
                </div>

                {MOCK_LEADERBOARD.map((entry, i) => (
                    <LeaderboardRow key={i} entry={entry} index={i} />
                ))}

                {/* Player's own row */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.25rem', marginTop: '0.25rem' }}>
                    <LeaderboardRow entry={playerEntry} index={99} isHighlighted />
                </div>
            </div>
        </div>
    );
}

function LeaderboardRow({ entry, index, isHighlighted = false }) {
    const rankColors = { 1: 'var(--gold)', 2: '#c0c0c0', 3: '#cd7f32' };
    const rankColor = rankColors[entry.rank] || 'var(--text-dim)';

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0, transition: { delay: index * 0.04 } }}
            style={{
                display: 'grid',
                gridTemplateColumns: '50px 1fr 1fr 100px 80px',
                padding: '0.85rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: isHighlighted ? 'rgba(57,255,20,0.06)' : 'transparent',
                border: isHighlighted ? '1px solid rgba(57,255,20,0.3)' : 'none',
                borderRadius: isHighlighted ? '6px' : '0',
                alignItems: 'center',
                margin: isHighlighted ? '0.25rem' : 0,
                transition: 'background 0.2s',
            }}
        >
            <span style={{ color: rankColor, fontWeight: 700, fontSize: '0.9rem' }}>
                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{entry.avatar}</span>
                <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: isHighlighted ? 'var(--neon)' : 'var(--text)' }}>
                        {entry.username} {isHighlighted ? '← YOU' : ''}
                    </div>
                </div>
            </div>

            <div>
                <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.85rem' }}>
                    {entry.xp.toLocaleString()} XP
                </div>
                <div style={{ height: '4px', width: `${Math.min((entry.xp / 14000) * 100, 100)}%`, background: 'var(--gold)', borderRadius: '2px', marginTop: '4px', opacity: 0.6 }} />
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.82rem' }}>
                {entry.badges} <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>badges</span>
            </div>

            <div style={{ textAlign: 'right' }}>
                <span className="badge badge-neon" style={{ fontSize: '0.55rem' }}>
                    LVL {getLevelInfo(entry.xp).current.level}
                </span>
            </div>
        </motion.div>
    );
}
