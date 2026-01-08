import { useState, useEffect } from 'react';
import { TaskProvider } from './context/TaskContext';
import EbruSplash from './components/splash/EbruSplash';
import KanbanBoard from './components/kanban/KanbanBoard';
import RankDisplay from './components/gamification/RankDisplay';
import Katip from './components/common/Katip';
import AlarmManager from './components/notifications/AlarmManager';
import MobileLayout from './components/mobile/MobileLayout';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <TaskProvider>
      {/* Splash Screen */}
      {showSplash && <EbruSplash onComplete={handleSplashComplete} />}

      {/* Main Application */}
      {!showSplash && (
        <>
          {isMobile ? (
            <MobileLayout />
          ) : (
            <div className="min-h-screen">
              {/* Rank Display - Fixed in top right */}
              <div className="fixed top-4 right-4 z-30">
                <RankDisplay compact />
              </div>

              {/* Main Content */}
              <KanbanBoard />

              {/* Katip Assistant */}
              <Katip />

              {/* Alarm Manager */}
              <AlarmManager />

              {/* Footer */}
              <footer className="text-center py-6 text-ottoman-bordeaux/50 text-sm font-medium">
                <p>Divan-ı Not - Osmanlı temalı görev yöneticisi</p>
                <p className="text-xs mt-1">Her hak saklıdır © 2026</p>
              </footer>
            </div>
          )}
        </>
      )}
    </TaskProvider>
  );
}

export default App;
