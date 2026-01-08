import { motion } from 'framer-motion';
import { useTaskContext } from '../../context/TaskContext';
import { Trophy, Star, Zap, Award } from 'lucide-react';

const rankInfo = {
  'Acemi Oğlanı': {
    icon: Star,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-400',
    description: 'Yeni başlangıç',
    nextRank: 'Yeniçeri',
    nextThreshold: 10
  },
  'Yeniçeri': {
    icon: Zap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
    description: 'Deneyimli savaşçı',
    nextRank: 'Paşa',
    nextThreshold: 50
  },
  'Paşa': {
    icon: Award,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-500',
    description: 'Komutan',
    nextRank: 'Sadrazam',
    nextThreshold: 100
  },
  'Sadrazam': {
    icon: Trophy,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-500',
    description: 'Vezir-i Azam',
    nextRank: null,
    nextThreshold: null
  }
};

const RankDisplay = ({ compact = false }) => {
  const { rank, completedCount } = useTaskContext();
  const info = rankInfo[rank];
  const Icon = info.icon;

  const progress = info.nextThreshold
    ? (completedCount / info.nextThreshold) * 100
    : 100;

  if (compact) {
    return (
      <motion.div
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${info.bgColor} border-2 ${info.borderColor} cursor-help relative group`}
        whileHover={{ scale: 1.05 }}
      >
        <Icon className={`w-5 h-5 ${info.color}`} />
        <span className={`font-semibold ${info.color}`}>{rank}</span>
        <span className="text-sm text-gray-600">({completedCount})</span>

        {/* Tooltip */}
        <div className="absolute top-full right-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-xl border-2 border-ottoman-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          <p className="font-heading text-ottoman-bordeaux mb-1">{info.description}</p>
          {info.nextRank ? (
            <div className="text-sm text-gray-600">
              <p>Sonraki Rütbe: {info.nextRank}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="h-full bg-ottoman-turquoise rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-ottoman-gold font-bold">En üst rütbedesiniz!</p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="ottoman-card gold-border p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-4 rounded-full ${info.bgColor} border-4 ${info.borderColor}`}>
          <Icon className={`w-8 h-8 ${info.color}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-heading text-ottoman-bordeaux">{rank}</h3>
          <p className="text-sm text-ottoman-bordeaux/60 font-medium">{info.description}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-ottoman-gold">{completedCount}</div>
          <div className="text-xs text-ottoman-bordeaux/50">Tamamlanan</div>
        </div>
      </div>

      {/* Progress Bar */}
      {info.nextThreshold && (
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-ottoman-bordeaux/70 font-medium">
              Sonraki rütbe: {info.nextRank}
            </span>
            <span className="text-ottoman-bordeaux/70 font-medium">
              {completedCount}/{info.nextThreshold}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-ottoman-turquoise to-ottoman-gold"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          {completedCount >= info.nextThreshold && (
            <motion.div
              className="mt-2 text-center text-sm font-semibold text-ottoman-crimson"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              🎉 Terfi için hazırsınız!
            </motion.div>
          )}
        </div>
      )}

      {rank === 'Sadrazam' && (
        <div className="text-center mt-2">
          <motion.p
            className="text-lg font-heading text-ottoman-gold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Zirveye ulaştınız! ✨
          </motion.p>
        </div>
      )}
    </motion.div>
  );
};

export default RankDisplay;
