import { motion } from 'framer-motion';
import { getLevelInfo } from '../../data/gameData';

export function XPBar({ xp, compact = false }) {
    const { current, next, progress } = getLevelInfo(xp);
    return (
        <div className="w-full">
            {!compact && (
                <div className="flex justify-between text-xs dim-text mb-1">
                    <span className="neon-text pixel" style={{ fontSize: '0.5rem', letterSpacing: '0.03em' }}>{current.title}</span>
                    {next && (
                        <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.65rem' }}>
                            {(xp - current.minXP)} / {(next.minXP - current.minXP)} XP
                        </span>
                    )}
                </div>
            )}
            <div className="xp-bar-track">
                <motion.div
                    className="xp-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
            {!compact && next && (
                <div style={{
                    display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem',
                }}>
                    <span style={{
                        fontSize: '0.5rem', color: 'var(--text-dim)',
                        fontFamily: 'var(--font-code)', letterSpacing: '0.03em',
                    }}>
                        → {next.title}
                    </span>
                </div>
            )}
        </div>
    );
}

export function LevelBadge({ xp }) {
    const { current } = getLevelInfo(xp);
    return (
        <motion.span
            className="pixel badge badge-neon"
            style={{
                fontSize: '0.42rem', padding: '0.28rem 0.55rem',
                letterSpacing: '0.05em',
            }}
            whileHover={{ scale: 1.08, boxShadow: '0 0 12px rgba(57,255,20,0.4)' }}
        >
            LVL {current.level}
        </motion.span>
    );
}
