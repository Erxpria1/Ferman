## 2024-05-23 - Accessibility in Ottoman-Themed Kanban
**Learning:** Custom interactive components like Kanban cards often lack semantic structure. Using standard `div` elements without ARIA roles makes them invisible to keyboard and screen reader users.
**Action:** Always add `role="button"`, `tabIndex={0}`, `onKeyDown` and descriptive `aria-label` to interactive cards. Ensure purely visual indicators (like border colors for priority) have text equivalents for screen readers.
