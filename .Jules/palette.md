## 2026-01-15 - Task Card Accessibility
**Learning:** Kanban cards are complex interactive elements. Simply adding `onClick` to a div makes it inaccessible. Users need `role="button"`, `tabIndex`, and `onKeyDown` to interact via keyboard. Drag handles are invisible to screen readers without `aria-label`.
**Action:** When implementing sortable items, always wrap the item in a semantic button or provide full ARIA roles + keyboard handlers to the container, and explicitly label the drag handle.
