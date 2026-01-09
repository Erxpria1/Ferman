import { createContext, useContext, useState, useEffect } from 'react';
import storage from '../utils/storage';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  // Initialize state lazily from storage
  const [tasks, setTasks] = useState(() => storage.getTasks());
  const [rank, setRank] = useState(() => storage.getRank());
  const [completedCount, setCompletedCount] = useState(() => storage.getCompletedCount());

  // Save tasks whenever they change
  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  // Calculate rank based on completed tasks
  const calculateRank = (count) => {
    if (count >= 100) return 'Sadrazam';
    if (count >= 50) return 'Paşa';
    if (count >= 10) return 'Yeniçeri';
    return 'Acemi Oğlanı';
  };

  // Add a new task
  const addTask = (task, column = 'fermanlar') => {
    const newTask = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...task
    };

    setTasks(prev => ({
      ...prev,
      [column]: [...prev[column], newTask]
    }));

    return newTask;
  };

  // Update a task
  const updateTask = (taskId, updates, column) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    }));
  };

  // Delete a task
  const deleteTask = (taskId, column) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(task => task.id !== taskId)
    }));
  };

  // Move task between columns
  const moveTask = (taskId, fromColumn, toColumn) => {
    setTasks(prev => {
      const taskToMove = prev[fromColumn].find(task => task.id === taskId);
      if (!taskToMove) return prev;

      // If moving to Hazine (completed), increment counter and update rank
      if (toColumn === 'hazine' && fromColumn !== 'hazine') {
        const newCount = completedCount + 1;
        setCompletedCount(newCount);
        storage.saveCompletedCount(newCount);

        const newRank = calculateRank(newCount);
        if (newRank !== rank) {
          setRank(newRank);
          storage.saveRank(newRank);
        }
      }

      return {
        ...prev,
        [fromColumn]: prev[fromColumn].filter(task => task.id !== taskId),
        [toColumn]: [...prev[toColumn], { ...taskToMove, movedAt: new Date().toISOString() }]
      };
    });
  };

  // Reorder tasks within a column
  const reorderTasks = (column, startIndex, endIndex) => {
    setTasks(prev => {
      const columnTasks = [...prev[column]];
      const [removed] = columnTasks.splice(startIndex, 1);
      columnTasks.splice(endIndex, 0, removed);

      return {
        ...prev,
        [column]: columnTasks
      };
    });
  };

  const value = {
    tasks,
    rank,
    completedCount,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
