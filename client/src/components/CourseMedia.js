import { IconClock, IconLayers } from "./Icons";
import getCourseVisual from "./courseVisual";

export default function CourseMedia({
  course,
  className = "course-card-media",
  iconSize = 26,
  glyphSize = 92,
  showChips = true,
  children,
}) {
  const { Icon, label, tone } = getCourseVisual(course);
  const lessonCount = course?.lessons?.length || 0;

  return (
    <div className={`${className} tone-${tone}`}>
      {course?.thumbnail ? (
        <img src={course.thumbnail} alt="" loading="lazy" />
      ) : (
        <>
          <span className="course-media-glyph" aria-hidden="true">
            <Icon size={glyphSize} />
          </span>
          <span className="course-media-icon">
            <Icon size={iconSize} />
          </span>
          <span className="course-media-topic">{label}</span>
          {showChips && (
            <span className="course-media-chips">
              <span className="course-media-chip">
                <IconLayers size={12} /> {lessonCount}
              </span>
              <span className="course-media-chip">
                <IconClock size={12} /> Lifetime
              </span>
            </span>
          )}
        </>
      )}
      {children}
    </div>
  );
}
