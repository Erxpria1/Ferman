import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { useState } from 'react';

const KanbanColumn = ({ column, tasks, onTaskClick }) => {
  const { addTask } = useTaskContext();
  const [showInput, setShowInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(
        {
          title: newTaskTitle,
          description: '',
          priority: 'normal',
          emoji: '📝'
        },
        column.id
      );
      setNewTaskTitle('');
      setShowInput(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setShowInput(false);
      setNewTaskTitle('');
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col h-full min-h-[600px]"
    >
      {/* Column Header */}
      <div className="ottoman-card gold-border mb-4 p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{column.icon}</span>
            <div>
              <h2 className="text-2xl font-heading text-ottoman-bordeaux">
                {column.title}
              </h2>
              <p className="text-sm text-ottoman-bordeaux/60 font-medium">
                {column.subtitle}
              </p>
            </div>
          </div>
          <div className="ottoman-seal w-12 h-12 flex items-center justify-center text-white font-bold text-lg">
            {tasks.length}
          </div>
        </div>
      </div>

      {/* Tasks Container */}
      <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar p-2">
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task, column.id)}
            />
          ))}
        </SortableContext>

        {/* Empty State */}
        {tasks.length === 0 && !showInput && (
          <div className="parchment rounded-lg p-8 text-center border-2 border-dashed border-ottoman-gold">
            <p className="text-ottoman-bordeaux/50 font-medium">
              {column.id === 'fermanlar' && 'Ferman bekliyor...'}
              {column.id === 'islemde' && 'İşlem yok...'}
              {column.id === 'hazine' && 'Hazine boş...'}
            </p>
          </div>
        )}
      </div>

      {/* Add Task Button/Input */}
      <div className="mt-4">
        {showInput ? (
          <div className="ottoman-card p-4">
            <input
              type="text"
              className="w-full px-4 py-2 border-2 border-ottoman-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-ottoman-turquoise font-body"
              placeholder="Ferman yazın..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={() => {
                if (!newTaskTitle.trim()) {
                  setShowInput(false);
                }
              }}
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAddTask}
                className="flex-1 ottoman-btn text-sm py-2"
              >
                Ekle
              </button>
              <button
                onClick={() => {
                  setShowInput(false);
                  setNewTaskTitle('');
                }}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                İptal
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="w-full ottoman-card hover:bg-ottoman-turquoise/10 transition-colors p-4 flex items-center justify-center gap-2 group"
          >
            <Plus className="w-5 h-5 text-ottoman-turquoise group-hover:scale-110 transition-transform" />
            <span className="font-medium text-ottoman-turquoise">
              Yeni Ferman
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
