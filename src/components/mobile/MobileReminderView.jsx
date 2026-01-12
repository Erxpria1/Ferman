import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Plus, Trash2, Clock, Check } from 'lucide-react';
import storage from '../../utils/storage';

const MobileReminderView = () => {
  const [alarms, setAlarms] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAlarm, setNewAlarm] = useState({
    time: '',
    title: '',
    enabled: true,
  });

  useEffect(() => {
    // Load alarms initially
    setAlarms(storage.getAlarms());

    // Poll for updates (in case background logic updates them)
    const interval = setInterval(() => {
      setAlarms(storage.getAlarms());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const addAlarm = () => {
    if (!newAlarm.time || !newAlarm.title) return;

    const alarm = {
      id: Date.now(),
      ...newAlarm,
      createdAt: new Date().toISOString(),
      triggered: false,
    };

    const updatedAlarms = [...alarms, alarm];
    setAlarms(updatedAlarms);
    storage.saveAlarms(updatedAlarms);
    setNewAlarm({ time: '', title: '', enabled: true });
    setIsAdding(false);
  };

  const deleteAlarm = (id) => {
    const updated = alarms.filter(a => a.id !== id);
    setAlarms(updated);
    storage.saveAlarms(updated);
  };

  const toggleAlarm = (id) => {
    const updated = alarms.map(a =>
      a.id === id ? { ...a, enabled: !a.enabled } : a
    );
    setAlarms(updated);
    storage.saveAlarms(updated);
  };

  return (
    <div className="pb-24 pt-4 px-4 min-h-screen bg-ottoman-cream">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading text-ottoman-bordeaux">Anımsatıcı</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="ottoman-btn !px-3 !py-2 rounded-full shadow-lg active:scale-95"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Add Form (Expandable) */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="ottoman-card space-y-4">
              <h3 className="font-semibold text-ottoman-bordeaux">Yeni Alarm</h3>
              <input
                type="time"
                value={newAlarm.time}
                onChange={(e) => setNewAlarm({...newAlarm, time: e.target.value})}
                className="w-full p-3 border-2 border-ottoman-gold rounded-lg font-mono text-lg"
              />
              <input
                type="text"
                placeholder="Başlık..."
                value={newAlarm.title}
                onChange={(e) => setNewAlarm({...newAlarm, title: e.target.value})}
                className="w-full p-3 border-2 border-ottoman-gold rounded-lg"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-3 text-gray-500 font-medium"
                >
                  İptal
                </button>
                <button
                  onClick={addAlarm}
                  className="flex-1 ottoman-btn"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alarm List */}
      <div className="space-y-3">
        {alarms.length === 0 ? (
          <div className="text-center py-20 text-ottoman-bordeaux/40">
            <Bell className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Hatırlatıcı yok...</p>
          </div>
        ) : (
          alarms.map((alarm) => (
            <motion.div
              key={alarm.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`ottoman-card flex items-center p-4 gap-4 ${!alarm.enabled ? 'opacity-60 grayscale' : ''}`}
            >
              <button
                onClick={() => toggleAlarm(alarm.id)}
                className={`w-6 h-6 rounded-full border-2 border-ottoman-turquoise flex items-center justify-center transition-colors ${
                  alarm.enabled ? 'bg-ottoman-turquoise' : 'bg-transparent'
                }`}
              >
                {alarm.enabled && <Check className="w-4 h-4 text-white" />}
              </button>

              <div className="flex-1">
                <div className="text-2xl font-mono font-bold text-ottoman-bordeaux leading-none">
                  {alarm.time}
                </div>
                <div className="text-sm text-ottoman-bordeaux/70 mt-1">
                  {alarm.title}
                </div>
              </div>

              <button
                onClick={() => deleteAlarm(alarm.id)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MobileReminderView;
