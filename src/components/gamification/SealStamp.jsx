import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const SealStamp = ({ show, onComplete }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Seal Stamp Animation */}
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            {/* Outer Seal Circle */}
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-ottoman-crimson to-ottoman-bordeaux border-8 border-ottoman-gold shadow-2xl flex items-center justify-center relative">
              {/* Inner Decorative Circles */}
              <div className="absolute inset-4 rounded-full border-4 border-white/30" />
              <div className="absolute inset-8 rounded-full border-2 border-white/50" />

              {/* Stamp Text */}
              <div className="text-center relative z-10">
                <motion.div
                  className="text-6xl mb-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  ✓
                </motion.div>
                <div className="text-white font-heading text-xl">
                  Görüldü
                </div>
                <div className="text-white/80 font-semibold text-sm mt-1">
                  Onaylandı
                </div>
              </div>

              {/* Decorative Stars */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-ottoman-gold rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translateY(-100px)`,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                />
              ))}
            </div>

            {/* Stamp Impact Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-ottoman-crimson"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Success Text Below */}
            <motion.div
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-2xl font-heading text-ottoman-bordeaux text-shadow-ottoman">
                Maşallah! 🎉
              </div>
            </motion.div>
          </motion.div>

          {/* Confetti Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ['#FFD700', '#1ABC9C', '#DC143C', '#8B0000'][i % 4],
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1.5,
                delay: 0.3 + Math.random() * 0.3,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SealStamp;
