import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Plus, X, Clock, Trash2 } from 'lucide-react';
import storage from '../../utils/storage';

const AlarmManager = () => {
  const [showAlarmPanel, setShowAlarmPanel] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [newAlarm, setNewAlarm] = useState({
    time: '',
    title: '',
    enabled: true,
  });

  // Load alarms on mount
  useEffect(() => {
    const savedAlarms = storage.getAlarms();
    setAlarms(savedAlarms);
    requestNotificationPermission();
  }, []);

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  // Check alarms every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkAlarms();
    }, 60000); // Check every minute

    // Also check immediately
    checkAlarms();

    return () => clearInterval(interval);
  }, [alarms]);

  const checkAlarms = () => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    alarms.forEach((alarm) => {
      if (alarm.enabled && alarm.time === currentTime && !alarm.triggered) {
        triggerAlarm(alarm);
      }
    });
  };

  const triggerAlarm = (alarm) => {
    // Show browser notification
    if (Notification.permission === 'granted') {
      new Notification('⏰ Divan-ı Not Hatırlatıcı', {
        body: alarm.title || 'Zamanı geldi!',
        icon: '/vite.svg',
        badge: '/vite.svg',
        tag: `alarm-${alarm.id}`,
      });
    }

    // Play sound (optional - you can add a sound file)
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYHGWa77OyhTBELUKng77RgGwU7k9ryz3k0BySAzvLaizsIGGS56+mjUBQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihUxQLTqXh8LdjHAU+ldz0yX8xCC5/zPLaiDwHHGi87OihU');
    audio.play().catch(() => {});

    // Mark as triggered
    updateAlarmTriggered(alarm.id);
  };

  const updateAlarmTriggered = (alarmId) => {
    const updatedAlarms = alarms.map((alarm) =>
      alarm.id === alarmId ? { ...alarm, triggered: true } : alarm
    );
    setAlarms(updatedAlarms);
    storage.saveAlarms(updatedAlarms);
  };

  const addAlarm = () => {
    if (!newAlarm.time || !newAlarm.title) {
      alert('Lütfen saat ve başlık giriniz');
      return;
    }

    const alarm = {
      id: Date.now(),
      ...newAlarm,
      createdAt: new Date().toISOString(),
      triggered: false,
    };

    const updatedAlarms = [...alarms, alarm];
    setAlarms(updatedAlarms);
    storage.saveAlarms(updatedAlarms);

    // Reset form
    setNewAlarm({ time: '', title: '', enabled: true });
  };

  const deleteAlarm = (alarmId) => {
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== alarmId);
    setAlarms(updatedAlarms);
    storage.saveAlarms(updatedAlarms);
  };

  const toggleAlarm = (alarmId) => {
    const updatedAlarms = alarms.map((alarm) =>
      alarm.id === alarmId
        ? { ...alarm, enabled: !alarm.enabled, triggered: false }
        : alarm
    );
    setAlarms(updatedAlarms);
    storage.saveAlarms(updatedAlarms);
  };

  return (
    <>
      {/* Floating Alarm Button */}
      <motion.button
        onClick={() => setShowAlarmPanel(true)}
        className="fixed bottom-8 left-8 z-30 ottoman-seal w-16 h-16 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Hatırlatıcılar"
      >
        <Bell className="w-7 h-7 text-white" />
        {alarms.filter((a) => a.enabled).length > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-ottoman-crimson rounded-full text-white text-xs flex items-center justify-center font-bold">
            {alarms.filter((a) => a.enabled).length}
          </span>
        )}
      </motion.button>

      {/* Alarm Panel */}
      <AnimatePresence>
        {showAlarmPanel && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAlarmPanel(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="parchment gold-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b-2 border-ottoman-gold bg-gradient-to-b from-white to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-ottoman-gold" />
                      <h2 className="text-2xl font-heading text-ottoman-bordeaux">
                        Hatırlatıcılar
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowAlarmPanel(false)}
                      className="p-2 hover:bg-ottoman-crimson/10 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-ottoman-crimson" />
                    </button>
                  </div>
                </div>

                {/* Add New Alarm */}
                <div className="p-6 border-b-2 border-ottoman-gold/30">
                  <h3 className="text-lg font-semibold text-ottoman-bordeaux mb-4">
                    Yeni Hatırlatıcı
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="time"
                      value={newAlarm.time}
                      onChange={(e) =>
                        setNewAlarm({ ...newAlarm, time: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-ottoman-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-ottoman-turquoise"
                    />
                    <input
                      type="text"
                      placeholder="Hatırlatıcı başlığı..."
                      value={newAlarm.title}
                      onChange={(e) =>
                        setNewAlarm({ ...newAlarm, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-ottoman-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-ottoman-turquoise"
                    />
                    <button
                      onClick={addAlarm}
                      className="w-full ottoman-btn flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Ekle
                    </button>
                  </div>
                </div>

                {/* Alarm List */}
                <div className="p-6 max-h-96 overflow-y-auto">
                  {alarms.length === 0 ? (
                    <p className="text-center text-ottoman-bordeaux/50 py-8">
                      Henüz hatırlatıcı yok
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {alarms.map((alarm) => (
                        <div
                          key={alarm.id}
                          className={`ottoman-card p-4 flex items-center justify-between ${
                            !alarm.enabled ? 'opacity-50' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <input
                              type="checkbox"
                              checked={alarm.enabled}
                              onChange={() => toggleAlarm(alarm.id)}
                              className="w-5 h-5 text-ottoman-turquoise"
                            />
                            <div>
                              <p className="font-bold text-ottoman-bordeaux text-lg">
                                {alarm.time}
                              </p>
                              <p className="text-sm text-ottoman-bordeaux/70">
                                {alarm.title}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteAlarm(alarm.id)}
                            className="p-2 hover:bg-red-100 rounded-full transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AlarmManager;
