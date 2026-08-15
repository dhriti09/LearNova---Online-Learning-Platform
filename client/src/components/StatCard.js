export default function StatCard({ icon, value, label }) {
  return (
    <div className="stat-card">
      <span className="stat-card-icon">{icon}</span>
      <div>
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
      </div>
    </div>
  );
}
