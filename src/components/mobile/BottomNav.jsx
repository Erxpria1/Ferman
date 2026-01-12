import { motion } from 'framer-motion';
import { Scroll, Bell, Diamond } from 'lucide-react';

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'tasks', label: 'Fermanlar', icon: Scroll },
    { id: 'reminders', label: 'Anımsatıcı', icon: Bell },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t-2 border-ottoman-gold shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 pb-4 px-6 flex justify-around items-center bg-opacity-95 backdrop-blur-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 w-20 transition-colors duration-300 ${
              isActive ? 'text-ottoman-bordeaux' : 'text-gray-400'
            }`}
          >
            <div className="relative">
              <tab.icon
                className={`w-7 h-7 ${
                  isActive ? 'fill-current' : 'stroke-current'
                }`}
                strokeWidth={isActive ? 2 : 1.5}
              />
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute -bottom-2 left-1/2 w-1 h-1 bg-ottoman-gold rounded-full"
                  style={{ translateX: '-50%' }}
                />
              )}
            </div>
            <span className="text-[10px] font-medium tracking-wide">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
