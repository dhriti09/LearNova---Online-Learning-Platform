import { Link } from "react-router-dom";
import { IconLayers, IconArrowRight } from "./Icons";
import CourseMedia from "./CourseMedia";

export default function CourseCard({ course, enrolled = false }) {
  const lessonCount = course.lessons?.length || 0;

  return (
    <article className="course-card">
      <CourseMedia course={course}>
        {enrolled && <span className="badge badge-enrolled">Enrolled</span>}
      </CourseMedia>

      <div className="course-card-body">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-desc">{course.description}</p>

        <div className="course-card-meta">
          <span>By {course.instructor?.name || "Unknown instructor"}</span>
          <span className="course-card-meta-dot">&middot;</span>
          <span>
            <IconLayers size={14} /> {lessonCount}{" "}
            {lessonCount === 1 ? "lesson" : "lessons"}
          </span>
        </div>

        <div className="course-card-footer">
          <span className="course-card-price">
            {course.price ? `\u20b9${course.price}` : "Free"}
          </span>
          <Link to={`/courses/${course._id}`} className="btn btn-secondary btn-sm">
            View course <IconArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
