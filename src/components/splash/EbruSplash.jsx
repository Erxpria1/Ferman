import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const EbruSplash = ({ onComplete }) => {
  const [showText, setShowText] = useState(false);
  const [bubbles] = useState(() => {
    // Generate bubbles lazily during initialization
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 80,
      delay: Math.random() * 0.5,
      color: [
        'var(--ottoman-turquoise)',
        'var(--ottoman-gold)',
        'var(--ottoman-bordeaux)',
        'var(--ottoman-crimson)'
      ][Math.floor(Math.random() * 4)]
    }));
  });

  useEffect(() => {
    // Show text after bubbles animate
    const textTimer = setTimeout(() => setShowText(true), 1500);
    // Complete splash after full animation
    const completeTimer = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 ebru-container flex items-center justify-center overflow-hidden z-50">
      {/* Animated Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 0.6, 0.4],
          }}
          transition={{
            duration: 1,
            delay: bubble.delay,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Central Logo/Text Formation */}
      {showText && (
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Ottoman Seal Background */}
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-64 h-64 rounded-full border-8 border-ottoman-gold opacity-30 blur-sm" />
          </motion.div>

          {/* Main Title */}
          <h1 className="text-6xl font-heading text-white text-shadow-ottoman mb-4">
            Divan-ı Not
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-2xl text-ottoman-cream font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Hoş Geldiniz Hünkarım
          </motion.p>

          {/* Decorative Ottoman Pattern */}
          <motion.div
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-12 h-12 rounded-full bg-ottoman-gold opacity-70" />
            <div className="w-12 h-12 rounded-full bg-ottoman-turquoise opacity-70" />
            <div className="w-12 h-12 rounded-full bg-ottoman-crimson opacity-70" />
          </motion.div>
        </motion.div>
      )}

      {/* Ebru Water Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/5 to-black/20 pointer-events-none" />
    </div>
  );
};

export default EbruSplash;
