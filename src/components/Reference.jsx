import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHEAT_SHEET } from '../data/gameData';

export default function Reference() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...CHEAT_SHEET.map(c => c.category)];

    const filteredData = CHEAT_SHEET.filter(cat =>
        (activeCategory === 'All' || cat.category === activeCategory) &&
        cat.commands.some(cmd =>
            cmd.cmd.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.desc.toLowerCase().includes(searchTerm.toLowerCase())
        )
    ).map(cat => ({
        ...cat,
        commands: cat.commands.filter(cmd =>
            cmd.cmd.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.desc.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }));

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}>
            <div className="pixel neon-text text-center mb-6" style={{ fontSize: '0.8rem' }}>
                ◈ GIT COMMAND REFERENCE ◈
            </div>

            {/* Search & Filter Bar */}
            <div className="glass p-4 mb-6" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--neon)', opacity: 0.6 }}>$ search_</span>
                    <input
                        type="text"
                        placeholder="Search commands..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            background: 'var(--bg-3)',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            padding: '0.75rem 0.75rem 0.75rem 5.5rem',
                            color: 'var(--text)',
                            fontFamily: 'var(--font-code)',
                            fontSize: '0.9rem',
                            outline: 'none',
                            transition: 'all 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--neon)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                    />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                background: activeCategory === cat ? 'var(--neon-dim)' : 'transparent',
                                border: `1px solid ${activeCategory === cat ? 'var(--neon)' : '#444'}`,
                                borderRadius: '4px',
                                padding: '0.3rem 0.7rem',
                                fontSize: '0.7rem',
                                color: activeCategory === cat ? 'var(--neon)' : 'var(--text-dim)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontFamily: 'var(--font-code)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Commands Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <AnimatePresence mode="popLayout">
                    {filteredData.map((cat, catIdx) => (
                        cat.commands.length > 0 && (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                                className="glass p-6 glass-hover"
                                style={{ height: 'fit-content' }}
                            >
                                <div className="pixel blue-text mb-4" style={{ fontSize: '0.55rem' }}>{cat.category.toUpperCase()}</div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {cat.commands.map((cmd, cmdIdx) => (
                                        <div key={cmd.cmd} style={{ borderBottom: cmdIdx === cat.commands.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)', paddingBottom: cmdIdx === cat.commands.length - 1 ? 0 : '1rem' }}>
                                            <div style={{ color: 'var(--neon)', fontFamily: 'var(--font-code)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>
                                                {cmd.cmd}
                                            </div>
                                            <div className="dim-text" style={{ fontSize: '0.8rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                                                {cmd.desc}
                                            </div>

                                            <div className="terminal-window" style={{ background: '#090909' }}>
                                                <div className="terminal-titlebar" style={{ padding: '0.2rem 0.5rem', fontSize: '0.6rem' }}>EXAMPLES</div>
                                                <div style={{ padding: '0.6rem', fontFamily: 'var(--font-code)', fontSize: '0.75rem' }}>
                                                    {cmd.examples.map(ex => (
                                                        <div key={ex} style={{ color: '#aaa', marginBottom: '0.25rem' }}>
                                                            <span style={{ color: 'var(--neon)', marginRight: '0.5rem' }}>λ</span> {ex}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>

            {filteredData.every(cat => cat.commands.length === 0) && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📡</div>
                    <div className="pixel" style={{ fontSize: '0.7rem' }}>NO COMMANDS FOUND FOR "{searchTerm.toUpperCase()}"</div>
                </div>
            )}
        </div>
    );
}
