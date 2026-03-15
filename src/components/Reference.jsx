import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHEAT_SHEET } from '../data/gameData';

export default function Reference() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = useMemo(() => ['All', ...CHEAT_SHEET.map(c => c.category)], []);

    const filteredData = useMemo(() => {
        return CHEAT_SHEET.filter(cat =>
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
    }, [searchTerm, activeCategory]);

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '2.5rem',
            alignItems: 'start'
        }}>

            {/* LEFT SIDEBAR: Categories */}
            <aside style={{ position: 'sticky', top: '5rem' }}>
                <div className="pixel neon-text mb-6" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
                    ◈ SYSTEM_CATALOG
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                background: activeCategory === cat ? 'var(--neon-dim)' : 'transparent',
                                border: `1px solid ${activeCategory === cat ? 'var(--neon)' : 'transparent'}`,
                                borderRadius: '8px',
                                padding: '0.75rem 1rem',
                                textAlign: 'left',
                                fontSize: '0.75rem',
                                color: activeCategory === cat ? 'var(--neon)' : 'var(--text-dim)',
                                cursor: 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                fontFamily: 'var(--font-code)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <span style={{ fontSize: '1rem', opacity: activeCategory === cat ? 1 : 0.4 }}>
                                {cat === 'All' ? '⚡' : '📂'}
                            </span>
                            <span style={{ flex: 1 }}>{cat}</span>
                            {activeCategory === cat && (
                                <motion.span layoutId="active-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--neon)', boxShadow: 'var(--glow-neon)' }} />
                            )}
                        </button>
                    ))}
                </div>

                <div className="glass p-4 mt-8" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                    <div className="blue-text mb-2" style={{ fontWeight: 700 }}>PRO TIP</div>
                    Click any command to copy it to your clipboard. Use search to filter specific flags.
                </div>
            </aside>

            {/* MAIN CONTENT Area */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <div>
                        <h1 className="pixel neon-text" style={{ fontSize: '1.2rem', margin: 0 }}>GIT_REFERENCE</h1>
                        <p className="dim-text" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                            Showing <span className="neon-text">{filteredData.reduce((acc, c) => acc + c.commands.length, 0)}</span> commands in <span className="blue-text">{activeCategory}</span>
                        </p>
                    </div>

                    <div style={{ position: 'relative', width: '350px' }}>
                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--neon)', opacity: 0.6 }}>$ search_</span>
                        <input
                            type="text"
                            placeholder="Filter commands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                background: 'rgba(0,0,0,0.4)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                padding: '0.8rem 1rem 0.8rem 5.5rem',
                                color: 'var(--text)',
                                fontFamily: 'var(--font-code)',
                                fontSize: '0.9rem',
                                outline: 'none',
                                transition: 'all 0.3s',
                                backdropFilter: 'blur(8px)'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--neon)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <AnimatePresence mode="popLayout">
                        {filteredData.map((cat, idx) => (
                            cat.commands.length > 0 && (
                                <motion.div
                                    key={cat.category}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: idx * 0.05 }}
                                    layout
                                >
                                    <div className="pixel dim-text mb-4" style={{ fontSize: '0.6rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{cat.category.toUpperCase()}</span>
                                        <span className="blue-text" style={{ opacity: 0.5 }}>MODULE_{idx + 1}</span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        {cat.commands.map(cmd => (
                                            <CommandCard key={cmd.cmd} cmd={cmd} />
                                        ))}
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>

                {filteredData.every(cat => cat.commands.length === 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--text-dim)' }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem', filter: 'grayscale(1) opacity(0.5)' }}>📡</div>
                        <div className="pixel" style={{ fontSize: '0.7rem' }}>ERROR: NO RECORDS MATCHING "{searchTerm.toUpperCase()}"</div>
                        <button
                            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                            className="mt-4"
                            style={{ background: 'none', border: 'none', color: 'var(--neon)', cursor: 'pointer', fontFamily: 'var(--font-code)', textDecoration: 'underline' }}
                        >
                            Reset Search Configuration
                        </button>
                    </motion.div>
                )}
            </section>
        </div>
    );
}

function CommandCard({ cmd }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            className="glass p-5 glass-hover"
            style={{ position: 'relative', overflow: 'hidden' }}
            whileHover={{ y: -4 }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                <code style={{
                    color: 'var(--neon)',
                    fontFamily: 'var(--font-code)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    display: 'block',
                    cursor: 'pointer'
                }} onClick={() => handleCopy(cmd.cmd)}>
                    {cmd.cmd}
                </code>
                <div
                    onClick={() => handleCopy(cmd.cmd)}
                    style={{
                        fontSize: '0.6rem',
                        color: copied ? 'var(--neon)' : 'var(--text-dim)',
                        padding: '2px 6px',
                        border: '1px solid',
                        borderColor: copied ? 'var(--neon)' : '#444',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-code)'
                    }}
                >
                    {copied ? 'COPIED!' : 'COPY'}
                </div>
            </div>

            <p className="dim-text" style={{ fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                {cmd.desc}
            </p>

            <div style={{
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '8px',
                padding: '0.75rem',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--blue)', opacity: 0.7, marginBottom: '0.5rem', fontWeight: 700 }}>SYNTAX_EXAMPLES</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cmd.examples.map(ex => (
                        <div
                            key={ex}
                            onClick={() => handleCopy(ex)}
                            style={{
                                fontFamily: 'var(--font-code)',
                                fontSize: '0.75rem',
                                color: '#ddd',
                                cursor: 'pointer',
                                display: 'flex',
                                gap: '0.5rem'
                            }}
                        >
                            <span style={{ color: 'var(--neon)' }}>λ</span>
                            {ex}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
