function initials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]).join("").toUpperCase();
}

// Deterministic hue so the same person always gets the same colour.
function hue(name) {
  let sum = 0;
  for (let i = 0; i < (name || "").length; i += 1) {
    sum = (sum + name.charCodeAt(i) * (i + 1)) % 360;
  }
  return sum;
}

export default function Avatar({ name, size = 36 }) {
  const h = hue(name);
  return (
    <span
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: Math.max(11, Math.round(size * 0.38)),
        background: `linear-gradient(135deg, hsl(${h} 70% 58%), hsl(${(h + 40) % 360} 72% 46%))`,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
