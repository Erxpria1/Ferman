## 2024-05-22 - Kanban Accessibility Pattern
**Learning:** When using dnd-kit with clickable cards, separating the drag handle and content into sibling interactive elements prevents invalid nested button structures and improves keyboard navigation.
**Action:** Use a flex container with distinct Drag Handle (button) and Content (button/link) areas instead of wrapping everything in one clickable container.
