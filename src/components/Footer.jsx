import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
    // Animated terminal status line
    const statusMessages = useMemo(() => [
        'SYS_STATUS: ALL_MODULES_NOMINAL',
        'UPLINK: SECURE_CHANNEL_ACTIVE',
        'NODE_INTEGRITY: VERIFIED',
        'GIT_PROTOCOL: v2.45.0_STABLE',
        'ENCRYPTION: AES-256_ENABLED',
    ], []);
    const [msgIdx, setMsgIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIdx(i => (i + 1) % statusMessages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [statusMessages.length]);

    return (
        <footer style={{
            padding: '1.5rem 2rem',
            marginTop: 'auto',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            background: 'linear-gradient(to top, rgba(10, 14, 20, 0.98), transparent)',
            position: 'relative',
            zIndex: 1,
        }}>
            {/* Animated top line */}
            <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(57,255,20,0.15), rgba(88,166,255,0.1), transparent)',
            }} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.6rem'
            }}>
                {/* Rotating status message */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={msgIdx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 0.4, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            fontSize: '0.6rem',
                            fontFamily: 'var(--font-code)',
                            color: 'var(--neon)',
                            letterSpacing: '0.12em',
                        }}
                    >
                        ◈ {statusMessages[msgIdx]}
                    </motion.div>
                </AnimatePresence>

                <div className="dim-text" style={{
                    fontSize: '0.65rem', fontFamily: 'var(--font-code)',
                    letterSpacing: '0.05em', opacity: 0.6,
                }}>
                    © {new Date().getFullYear()} GITOPIA PROTOCOL. ALL RIGHTS RESERVED.
                </div>

                {/* Easter Egg */}
                <motion.div
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1, color: 'var(--neon)', scale: 1.03 }}
                    style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-code)',
                        color: 'rgba(255, 254, 254, 0.7)',
                        cursor: 'default',
                        transition: 'color 0.3s ease',
                        marginTop: '0.15rem'
                    }}
                >
                    &lt; made-by-sathwik shetty-inunity /&gt;
                </motion.div>
            </div>
        </footer>
    );
}
