import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  TASKS: '@ottoman_tasks',
  RANK: '@ottoman_rank',
  COMPLETED_COUNT: '@ottoman_completed_count',
  ALARMS: '@ottoman_alarms',
};

export const storage = {
  getTasks: async () => {
    try {
      const tasks = await AsyncStorage.getItem(KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : { fermanlar: [], islemde: [], hazine: [] };
    } catch (error) {
      console.error('Error loading tasks:', error);
      return { fermanlar: [], islemde: [], hazine: [] };
    }
  },

  saveTasks: async (tasks) => {
    try {
      await AsyncStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Error saving tasks:', error);
      return false;
    }
  },

  getRank: async () => {
    try {
      const rank = await AsyncStorage.getItem(KEYS.RANK);
      return rank || 'Acemi Oğlanı';
    } catch {
      return 'Acemi Oğlanı';
    }
  },

  saveRank: async (rank) => {
    try {
      await AsyncStorage.setItem(KEYS.RANK, rank);
      return true;
    } catch {
      return false;
    }
  },

  getCompletedCount: async () => {
    try {
      const count = await AsyncStorage.getItem(KEYS.COMPLETED_COUNT);
      return count ? parseInt(count, 10) : 0;
    } catch {
      return 0;
    }
  },

  saveCompletedCount: async (count) => {
    try {
      await AsyncStorage.setItem(KEYS.COMPLETED_COUNT, count.toString());
      return true;
    } catch {
      return false;
    }
  },
};

export default storage;
