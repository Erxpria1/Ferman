## 2025-05-20 - [Accessibility in Kanban Components]
**Learning:** Interactive Kanban components (TaskCard) were missing core accessibility attributes (ARIA labels, keyboard handlers) despite using accessible libraries like @dnd-kit.
**Action:** When working on Kanban or Drag-and-Drop components, explicitly verify keyboard accessibility (`tabIndex`, `onKeyDown`) and ensure drag handles have descriptive `aria-label`s, as the libraries don't always enforce this for custom handles.
