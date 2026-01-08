import { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '../kanban/TaskCard';
import TaskModal from '../kanban/TaskModal';
import { Plus } from 'lucide-react';

const MobileTaskView = () => {
  const { tasks, addTask } = useTaskContext();
  const [activeFilter, setActiveFilter] = useState('fermanlar');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Flatten tasks for list view, but filter based on selection
  const currentTasks = tasks[activeFilter] || [];

  const filters = [
    { id: 'fermanlar', label: 'Yapılacaklar' },
    { id: 'islemde', label: 'İşlemde' },
    { id: 'hazine', label: 'Tamamlanan' },
  ];

  const handleTaskClick = (task) => {
    setSelectedTask({ ...task, column: activeFilter });
  };

  const handleQuickAdd = () => {
    addTask(
      {
        title: 'Yeni Ferman',
        description: '',
        priority: 'normal',
        emoji: '📜',
      },
      'fermanlar'
    );
  };

  return (
    <div className="pb-24 pt-4 px-4 min-h-screen bg-ottoman-cream">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading text-ottoman-bordeaux">Fermanlar</h1>
        <button
          onClick={handleQuickAdd}
          className="ottoman-btn !px-3 !py-2 rounded-full shadow-lg active:scale-95"
          aria-label="Hızlı Ekle"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex p-1 bg-white/50 rounded-xl mb-6 border border-ottoman-gold/30">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeFilter === filter.id
                ? 'bg-ottoman-bordeaux text-white shadow-md'
                : 'text-ottoman-bordeaux/60 hover:bg-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {currentTasks.length > 0 ? (
            currentTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <TaskCard
                  task={task}
                  onClick={() => handleTaskClick(task)}
                  isDragging={false}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-ottoman-bordeaux/40"
            >
              <p>Bu sandık boş...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default MobileTaskView;
