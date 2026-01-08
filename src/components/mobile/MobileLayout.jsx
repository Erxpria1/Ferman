import { useState } from 'react';
import BottomNav from './BottomNav';
import MobileTaskView from './MobileTaskView';
import MobileReminderView from './MobileReminderView';
import Katip from '../common/Katip';
import AlarmManager from '../notifications/AlarmManager';
import { motion, AnimatePresence } from 'framer-motion';

const MobileLayout = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="min-h-screen bg-ottoman-cream overflow-hidden">
      {/* Background Logic */}
      {/* We keep AlarmManager mounted to check for alarms in background,
          but hide its UI using headless mode. */}
      <AlarmManager headless={true} />

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {activeTab === 'tasks' ? <MobileTaskView /> : <MobileReminderView />}
        </motion.div>
      </AnimatePresence>

      {/* Floating Assistant (Katip) - Positioned above nav */}
      <div className="fixed bottom-24 right-4 z-30">
        <Katip />
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default MobileLayout;
