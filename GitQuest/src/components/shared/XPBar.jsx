import { getLevelInfo } from '../../data/gameData';

export function XPBar({ xp, compact = false }) {
    const { current, next, progress } = getLevelInfo(xp);
    return (
        <div className="w-full">
            {!compact && (
                <div className="flex justify-between text-xs dim-text mb-1">
                    <span className="neon-text pixel" style={{ fontSize: '0.55rem' }}>{current.title}</span>
                    {next && <span>{(xp - current.minXP)} / {(next.minXP - current.minXP)} XP</span>}
                </div>
            )}
            <div className="xp-bar-track">
                <div className="xp-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
        </div>
    );
}

export function LevelBadge({ xp }) {
    const { current } = getLevelInfo(xp);
    return (
        <span
            className="pixel badge badge-neon"
            style={{ fontSize: '0.45rem', padding: '0.3rem 0.6rem' }}
        >
            LVL {current.level}
        </span>
    );
}
