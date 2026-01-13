import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

const TaskCard = ({ task, onClick, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const priorityColors = {
    low: 'border-l-4 border-l-ottoman-turquoise',
    normal: 'border-l-4 border-l-ottoman-gold',
    high: 'border-l-4 border-l-ottoman-crimson',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`ottoman-card cursor-pointer hover:shadow-xl transition-shadow ${
        priorityColors[task.priority || 'normal']
      } ${isDragging ? 'rotate-2' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${task.title}, Öncelik: ${
        task.priority === 'high'
          ? 'Yüksek'
          : task.priority === 'low'
          ? 'Düşük'
          : 'Normal'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing pt-1 outline-none focus-visible:ring-2 focus-visible:ring-ottoman-gold rounded"
          onClick={(e) => e.stopPropagation()}
          aria-label="Görevi taşı"
          role="button"
        >
          <GripVertical className="w-5 h-5 text-ottoman-bordeaux/30 hover:text-ottoman-bordeaux/60" />
        </div>

        {/* Task Content */}
        <div className="flex-1">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-2xl">{task.emoji || '📜'}</span>
            <h3 className="font-semibold text-ottoman-bordeaux flex-1">
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="text-sm text-gray-600 line-clamp-2 ml-8">
              {task.description}
            </p>
          )}

          {/* Task Meta */}
          {task.createdAt && (
            <div className="mt-2 ml-8 text-xs text-ottoman-bordeaux/50">
              {new Date(task.createdAt).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
