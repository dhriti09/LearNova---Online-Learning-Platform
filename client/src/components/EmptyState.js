export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="empty-state fade-in">
      {icon && <span className="empty-state-icon">{icon}</span>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
