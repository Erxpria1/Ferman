import { useState, useEffect } from 'react';
import { TaskProvider } from './context/TaskContext';
import EbruSplash from './components/splash/EbruSplash';
import KanbanBoard from './components/kanban/KanbanBoard';
import RankDisplay from './components/gamification/RankDisplay';
import Katip from './components/common/Katip';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <TaskProvider>
      {/* Splash Screen */}
      {showSplash && <EbruSplash onComplete={handleSplashComplete} />}

      {/* Main Application */}
      {!showSplash && (
        <div className="min-h-screen">
          {/* Rank Display - Fixed in top right */}
          <div className="fixed top-4 right-4 z-30">
            <RankDisplay compact />
          </div>

          {/* Main Content */}
          <KanbanBoard />

          {/* Katip Assistant */}
          <Katip />

          {/* Footer */}
          <footer className="text-center py-6 text-ottoman-bordeaux/50 text-sm font-medium">
            <p>Divan-ı Not - Osmanlı temalı görev yöneticisi</p>
            <p className="text-xs mt-1">Her hak saklıdır © 2026</p>
          </footer>
        </div>
      )}
    </TaskProvider>
  );
}

export default App;
