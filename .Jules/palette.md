## 2025-02-14 - Kanban Board Accessibility
**Learning:** `dnd-kit` components often lack default accessibility attributes. Interactive cards (`.ottoman-card`) were implemented as `div`s without keyboard support.
**Action:** Always add `role="button"`, `tabIndex={0}`, `aria-label`, and `onKeyDown` handlers to interactive Kanban cards.
