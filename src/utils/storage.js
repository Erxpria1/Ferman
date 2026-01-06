/**
 * LocalStorage utilities for Ottoman Notes App
 */

const STORAGE_KEYS = {
  TASKS: 'ottoman_tasks',
  USER_RANK: 'ottoman_rank',
  COMPLETED_COUNT: 'ottoman_completed_count',
  SETTINGS: 'ottoman_settings',
  ALARMS: 'ottoman_alarms',
};

export const storage = {
  // Task operations
  getTasks: () => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : {
        fermanlar: [],
        islemde: [],
        hazine: []
      };
    } catch (error) {
      console.error('Error loading tasks:', error);
      return { fermanlar: [], islemde: [], hazine: [] };
    }
  },

  saveTasks: (tasks) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Error saving tasks:', error);
      return false;
    }
  },

  // User rank operations
  getRank: () => {
    try {
      const rank = localStorage.getItem(STORAGE_KEYS.USER_RANK);
      return rank || 'Acemi Oğlanı';
    } catch (error) {
      return 'Acemi Oğlanı';
    }
  },

  saveRank: (rank) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_RANK, rank);
      return true;
    } catch (error) {
      console.error('Error saving rank:', error);
      return false;
    }
  },

  // Completed count operations
  getCompletedCount: () => {
    try {
      const count = localStorage.getItem(STORAGE_KEYS.COMPLETED_COUNT);
      return count ? parseInt(count, 10) : 0;
    } catch (error) {
      return 0;
    }
  },

  saveCompletedCount: (count) => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_COUNT, count.toString());
      return true;
    } catch (error) {
      console.error('Error saving completed count:', error);
      return false;
    }
  },

  incrementCompletedCount: () => {
    const currentCount = storage.getCompletedCount();
    const newCount = currentCount + 1;
    storage.saveCompletedCount(newCount);
    return newCount;
  },

  // Settings operations
  getSettings: () => {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        notifications: true,
        sounds: true,
        language: 'tr'
      };
    } catch (error) {
      return { notifications: true, sounds: true, language: 'tr' };
    }
  },

  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  // Alarm operations
  getAlarms: () => {
    try {
      const alarms = localStorage.getItem(STORAGE_KEYS.ALARMS);
      return alarms ? JSON.parse(alarms) : [];
    } catch (error) {
      console.error('Error loading alarms:', error);
      return [];
    }
  },

  saveAlarms: (alarms) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ALARMS, JSON.stringify(alarms));
      return true;
    } catch (error) {
      console.error('Error saving alarms:', error);
      return false;
    }
  },

  // Clear all data
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
};

export default storage;
