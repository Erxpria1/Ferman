import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Save } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

// Osmanlı temalı emoji seti
const emojiOptions = [
  '🏛️', // Topkapı Sarayı
  '☪️', // Hilal
  '🌷', // Lale (Lale Devri)
  '🌹', // Gül
  '⚔️', // Kılıç
  '👑', // Taç
  '📿', // Tesbih
  '🕌', // Cami
  '🎭', // Karagöz-Hacivat
  '🧿', // Nazar boncuğu
  '☕', // Türk kahvesi
  '📜', // Ferman
  '🏺', // Çini
  '🎨', // Hat sanatı
  '💎', // Mücevher
  '🗡️', // Hançer
];

const TaskModal = ({ task, onClose }) => {
  const { updateTask, deleteTask, moveTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: task.title || '',
    description: task.description || '',
    priority: task.priority || 'normal',
    emoji: task.emoji || '📜', // Ferman emoji - Osmanlı temalı
  });

  const handleSave = () => {
    updateTask(task.id, formData, task.column);
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Bu fermanı silmek istediğinizden emin misiniz?')) {
      deleteTask(task.id, task.column);
      onClose();
    }
  };

  const handleMoveToColumn = (targetColumn) => {
    moveTask(task.id, task.column, targetColumn);
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Parchment Scroll Container */}
          <div className="parchment gold-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Decorative Ottoman Border Pattern */}
            <div className="h-3 bg-gradient-to-r from-ottoman-gold via-ottoman-turquoise to-ottoman-gold" />

            {/* Modal Header */}
            <div className="p-6 border-b-2 border-ottoman-gold bg-gradient-to-b from-white to-transparent">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-heading text-ottoman-bordeaux text-shadow-ottoman">
                  Ferman Detayı
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="p-2 hover:bg-ottoman-crimson/10 rounded-full transition-colors z-10"
                  title="Kapat"
                >
                  <X className="w-6 h-6 text-ottoman-crimson" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Emoji Selector */}
              <div>
                <label className="block text-sm font-semibold text-ottoman-bordeaux mb-2">
                  İkon Seçin
                </label>
                <div className="flex gap-2 flex-wrap">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setFormData(prev => ({ ...prev, emoji }))}
                      className={`text-3xl p-2 rounded-lg transition-all ${
                        formData.emoji === emoji
                          ? 'bg-ottoman-gold scale-110 shadow-lg'
                          : 'bg-white hover:bg-ottoman-gold/20'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-ottoman-bordeaux mb-2">
                  Başlık
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-ottoman-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-ottoman-turquoise font-body text-lg"
                  placeholder="Ferman başlığı..."
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-ottoman-bordeaux mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-ottoman-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-ottoman-turquoise font-body resize-none"
                  placeholder="Detaylı açıklama yazın..."
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-semibold text-ottoman-bordeaux mb-2">
                  Öncelik
                </label>
                <div className="flex gap-3">
                  {[
                    { value: 'low', label: 'Düşük', color: 'ottoman-turquoise' },
                    { value: 'normal', label: 'Normal', color: 'ottoman-gold' },
                    { value: 'high', label: 'Yüksek', color: 'ottoman-crimson' }
                  ].map(({ value, label, color }) => (
                    <button
                      key={value}
                      onClick={() => setFormData(prev => ({ ...prev, priority: value }))}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all border-2 ${
                        formData.priority === value
                          ? `bg-${color} text-white border-${color} shadow-lg scale-105`
                          : `border-${color} text-${color} hover:bg-${color}/10`
                      }`}
                      style={{
                        backgroundColor: formData.priority === value ? `var(--${color})` : 'transparent',
                        borderColor: `var(--${color})`,
                        color: formData.priority === value ? 'white' : `var(--${color})`
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Move Between Columns */}
              {task.column !== 'hazine' && (
                <div>
                  <label className="block text-sm font-semibold text-ottoman-bordeaux mb-2">
                    Taşı
                  </label>
                  <div className="flex gap-3">
                    {task.column !== 'fermanlar' && (
                      <button
                        onClick={() => handleMoveToColumn('fermanlar')}
                        className="flex-1 py-2 px-4 bg-white border-2 border-ottoman-turquoise text-ottoman-turquoise rounded-lg hover:bg-ottoman-turquoise hover:text-white transition-colors font-medium"
                      >
                        📜 Fermanlar'a
                      </button>
                    )}
                    {task.column !== 'islemde' && (
                      <button
                        onClick={() => handleMoveToColumn('islemde')}
                        className="flex-1 py-2 px-4 bg-white border-2 border-ottoman-gold text-ottoman-gold rounded-lg hover:bg-ottoman-gold hover:text-white transition-colors font-medium"
                      >
                        ⚙️ İşlemde'ye
                      </button>
                    )}
                    <button
                      onClick={() => handleMoveToColumn('hazine')}
                      className="flex-1 py-2 px-4 bg-white border-2 border-ottoman-crimson text-ottoman-crimson rounded-lg hover:bg-ottoman-crimson hover:text-white transition-colors font-medium"
                    >
                      💎 Hazine'ye
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t-2 border-ottoman-gold bg-gradient-to-t from-white to-transparent flex justify-between">
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 font-semibold"
              >
                <Trash2 className="w-5 h-5" />
                Sil
              </button>
              <button
                onClick={handleSave}
                className="ottoman-btn flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Kaydet
              </button>
            </div>

            {/* Decorative Bottom Border */}
            <div className="h-3 bg-gradient-to-r from-ottoman-gold via-ottoman-turquoise to-ottoman-gold" />
          </div>

          {/* Decorative Seal in Corner */}
          <motion.div
            className="absolute -top-8 -right-8 ottoman-seal w-24 h-24 flex items-center justify-center text-white font-bold text-2xl"
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {formData.emoji}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;
