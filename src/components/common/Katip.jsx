import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

const quotes = [
  "Akıllı ol, ama sakın akıllı olduğunu belli etme.",
  "İşini bilene sultan da hizmet eder.",
  "Bugünün işini yarına bırakma, yarın başka işler çıkar.",
  "Vakti ganimet bil, bu fırsat bir daha ele girmez.",
  "Sabır acıdır ama meyvesi tatlıdır.",
  "İlim ilim bilmektir, ilim kendin bilmektir.",
  "Damlaya damlaya göl olur.",
  "Her şeyin başı sağlık, sonu düğün olsun.",
];

const Katip = () => {
  const { tasks } = useTaskContext();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Check for stale tasks (not updated in 3 days)
    const checkStaleTasks = () => {
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

      const staleTasks = [...tasks.fermanlar, ...tasks.islemde].filter(task => {
        const taskDate = new Date(task.createdAt || task.movedAt || now);
        return taskDate < threeDaysAgo;
      });

      if (staleTasks.length > 0) {
        setMessage(`Sultanım, ${staleTasks.length} ferman tozlandı. Halletmek icap eder! 📜`);
        setVisible(true);
        return;
      }

      // Check for empty Hazine
      if (tasks.hazine.length === 0 && (tasks.fermanlar.length > 0 || tasks.islemde.length > 0)) {
        setMessage('Hazine boş kalmış efendim. Bir fermanı tamamlayarak dolduralım! 💎');
        setVisible(true);
        return;
      }

      // Check for too many tasks in one column
      if (tasks.fermanlar.length > 10) {
        setMessage('Fermanlar yığılmış sultanım. Birazını işleme alsak iyi olur. ⚙️');
        setVisible(true);
        return;
      }

      // Daily wisdom (shown randomly)
      if (Math.random() < 0.3) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
        setMessage('Günün Sözü');
        setVisible(true);
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkStaleTasks, 30000);
    // Also check on mount
    setTimeout(checkStaleTasks, 5000);

    return () => clearInterval(interval);
  }, [tasks]);

  const handleDismiss = () => {
    setVisible(false);
    setMessage('');
    setQuote('');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 max-w-sm"
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          exit={{ opacity: 0, x: 100, rotate: -10 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          <div className="parchment gold-border rounded-xl shadow-2xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 hover:bg-ottoman-crimson/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-ottoman-crimson" />
            </button>

            {/* Katip Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-ottoman-gold rounded-full">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-ottoman-bordeaux">Katip</h3>
                <p className="text-xs text-ottoman-bordeaux/60">Akıl Danışmanınız</p>
              </div>
            </div>

            {/* Message */}
            <div className="mb-3">
              <p className="text-sm font-semibold text-ottoman-bordeaux mb-2">{message}</p>
              {quote && (
                <div className="mt-3 p-3 bg-white/50 rounded-lg border-l-4 border-ottoman-turquoise">
                  <p className="text-sm italic text-ottoman-bordeaux/80">"{quote}"</p>
                </div>
              )}
            </div>

            {/* Ottoman Seal Decoration */}
            <div className="absolute -bottom-3 -left-3 ottoman-seal w-16 h-16 flex items-center justify-center text-white text-2xl opacity-80">
              🏛️
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
              <svg viewBox="0 0 100 100" className="fill-ottoman-gold">
                <path d="M100,0 L100,100 L0,0 Z" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Katip;
