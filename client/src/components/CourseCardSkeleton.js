export default function CourseCardSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-media" />
      <div className="skeleton-card-body">
        <div className="skeleton skeleton-line" style={{ width: "45%" }} />
        <div className="skeleton skeleton-line" style={{ width: "85%", height: 18 }} />
        <div className="skeleton skeleton-line" style={{ width: "100%" }} />
        <div className="skeleton skeleton-line" style={{ width: "70%" }} />
        <div className="skeleton skeleton-line" style={{ width: "40%", marginTop: 12 }} />
      </div>
    </div>
  );
}

export function CourseCardSkeletonGrid({ count = 4 }) {
  return (
    <div className="course-grid" role="status" aria-label="Loading courses">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
