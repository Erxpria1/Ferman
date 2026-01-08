import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useTaskContext } from '../../context/TaskContext';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const KanbanBoard = () => {
  const { tasks, moveTask, reorderTasks } = useTaskContext();
  const [activeId, setActiveId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns = [
    { id: 'fermanlar', title: 'Fermanlar', subtitle: 'Yapılacaklar', icon: '📜' },
    { id: 'islemde', title: 'İşlemde', subtitle: 'Devam Edenler', icon: '⚙️' },
    { id: 'hazine', title: 'Hazine', subtitle: 'Tamamlananlar', icon: '💎' },
  ];

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeColumn = findColumn(active.id);
    const overColumn = findColumn(over.id);

    if (!activeColumn || !overColumn) {
      setActiveId(null);
      return;
    }

    // Moving between columns
    if (activeColumn !== overColumn) {
      moveTask(active.id, activeColumn, overColumn);
    } else {
      // Reordering within the same column
      const columnTasks = tasks[activeColumn];
      const oldIndex = columnTasks.findIndex(task => task.id === active.id);
      const newIndex = columnTasks.findIndex(task => task.id === over.id);

      if (oldIndex !== newIndex) {
        reorderTasks(activeColumn, oldIndex, newIndex);
      }
    }

    setActiveId(null);
  };

  const findColumn = (id) => {
    // Check if id is a column
    if (['fermanlar', 'islemde', 'hazine'].includes(id)) {
      return id;
    }

    // Find which column contains the task
    for (const [column, columnTasks] of Object.entries(tasks)) {
      if (columnTasks.find(task => task.id === id)) {
        return column;
      }
    }

    return null;
  };

  const handleTaskClick = (task, column) => {
    setSelectedTask({ ...task, column });
    setShowModal(true);
  };

  const getActiveTask = () => {
    if (!activeId) return null;

    for (const columnTasks of Object.values(tasks)) {
      const task = columnTasks.find(t => t.id === activeId);
      if (task) return task;
    }

    return null;
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-heading text-ottoman-bordeaux mb-2 text-shadow-ottoman">
          Divan-ı Not
        </h1>
        <p className="text-lg text-ottoman-bordeaux/70 font-medium">
          Sadrazam'ın Defteri
        </p>
      </header>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {columns.map((column) => (
            <SortableContext
              key={column.id}
              items={tasks[column.id].map(t => t.id)}
              id={column.id}
            >
              <KanbanColumn
                column={column}
                tasks={tasks[column.id]}
                onTaskClick={handleTaskClick}
              />
            </SortableContext>
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="opacity-50">
              <TaskCard task={getActiveTask()} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Detail Modal */}
      {showModal && selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setShowModal(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
