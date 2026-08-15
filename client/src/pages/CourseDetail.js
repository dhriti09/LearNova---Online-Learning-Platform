import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Avatar from "../components/Avatar";
import CourseMedia from "../components/CourseMedia";
import {
  IconCheck,
  IconCheckCircle,
  IconChevronDown,
  IconLayers,
  IconClock,
  IconAlertCircle,
} from "../components/Icons";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

export default function CourseDetail() {
  const { id } = useParams();
  const { user, refreshUser } = useAuth();
  const toast = useToast();

  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [openLesson, setOpenLesson] = useState(0);

  useEffect(() => {
    setCourse(null);
    setError("");
    api
      .get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch(() => setError("Course not found"));
  }, [id]);

  const isEnrolled = Boolean(
    user?.enrolledCourses?.some((c) => (typeof c === "string" ? c : c._id) === id)
  );

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await api.post(`/courses/${id}/enroll`);
      await refreshUser().catch(() => {});
      toast.success("Course enrolled successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not enroll");
    } finally {
      setEnrolling(false);
    }
  };

  if (error) {
    return (
      <div className="page container">
        <EmptyStateInline message={error} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading course...</p>
      </div>
    );
  }

  const lessons = course.lessons || [];

  return (
    <div>
      <div className="course-hero">
        <div className="container course-hero-inner">
          <div>
            <span className="course-hero-badge">Course</span>
            <h1>{course.title}</h1>
            <p className="course-hero-desc">{course.description}</p>
            <div className="course-hero-meta">
              <span className="course-hero-meta-item">
                <IconLayers size={16} />
                {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}
              </span>
              <span className="course-hero-meta-item">
                By {course.instructor?.name || "Unknown instructor"}
              </span>
              {course.updatedAt && (
                <span className="course-hero-meta-item">
                  <IconClock size={16} />
                  Updated {formatDate(course.updatedAt)}
                </span>
              )}
            </div>
          </div>

          <div className="enroll-card">
            <CourseMedia
              course={course}
              className="enroll-card-media course-card-media"
              iconSize={34}
              glyphSize={128}
            />

            <div className="enroll-card-price">
              {course.price ? `\u20b9${course.price}` : "Free"}
            </div>
            <div className="enroll-card-price-note">One-time enrollment</div>

            {!user && (
              <Link to="/login" className="btn btn-primary btn-block">
                Log in to Enroll
              </Link>
            )}

            {user && user.role === "instructor" && (
              <p className="field-hint" style={{ textAlign: "center" }}>
                Instructor accounts can't enroll in courses.
              </p>
            )}

            {user && user.role === "student" && isEnrolled && (
              <div className="enrolled-banner">
                <IconCheckCircle size={18} /> Already Enrolled
              </div>
            )}

            {user && user.role === "student" && !isEnrolled && (
              <button
                className="btn btn-primary btn-block"
                onClick={handleEnroll}
                disabled={enrolling}
              >
                {enrolling ? "Enrolling..." : "Enroll Now"}
              </button>
            )}

            <div className="enroll-card-list">
              <div className="enroll-card-list-item">
                <span>Lessons</span>
                <span>{lessons.length}</span>
              </div>
              <div className="enroll-card-list-item">
                <span>Access</span>
                <span>Lifetime</span>
              </div>
              <div className="enroll-card-list-item">
                <span>Instructor</span>
                <span>{course.instructor?.name || "Unknown"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container course-body">
        <div className="course-body-main">
          {lessons.length > 0 && (
            <section className="detail-section">
              <h2>What You'll Learn</h2>
              <ul className="checklist">
                {lessons.map((lesson, i) => (
                  <li key={i}>
                    <IconCheck size={18} />
                    <span>{lesson.title}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="detail-section">
            <h2>Course Curriculum</h2>
            {lessons.length === 0 ? (
              <p>The instructor hasn't added any lessons to this course yet.</p>
            ) : (
              lessons.map((lesson, i) => (
                <div
                  key={i}
                  className={"curriculum-item" + (openLesson === i ? " open" : "")}
                >
                  <button
                    className="curriculum-item-head"
                    onClick={() => setOpenLesson(openLesson === i ? -1 : i)}
                    aria-expanded={openLesson === i}
                  >
                    <span className="curriculum-item-title">
                      <span className="curriculum-item-number">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {lesson.title}
                    </span>
                    <IconChevronDown size={18} className="chevron" />
                  </button>
                  {openLesson === i && (
                    <div className="curriculum-item-content">
                      {lesson.content || "No additional details for this lesson yet."}
                    </div>
                  )}
                </div>
              ))
            )}
          </section>

          <section className="detail-section">
            <h2>Instructor</h2>
            <div className="instructor-card">
              <Avatar name={course.instructor?.name} size={56} />
              <div>
                <div className="instructor-card-name">
                  {course.instructor?.name || "Unknown instructor"}
                </div>
                <div className="instructor-card-role">Course Instructor</div>
              </div>
            </div>
          </section>
        </div>

        <aside className="course-body-side">
          <section className="detail-section">
            <h2>Course Information</h2>
            <div className="info-list">
              <div className="info-list-item">
                <IconLayers size={17} />
                <span>{lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}</span>
              </div>
              {course.createdAt && (
                <div className="info-list-item">
                  <IconClock size={17} />
                  <span>Published {formatDate(course.createdAt)}</span>
                </div>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function EmptyStateInline({ message }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">
        <IconAlertCircle size={26} />
      </span>
      <h3>{message}</h3>
      <p>The course you're looking for might have been removed or the link is incorrect.</p>
      <Link to="/courses" className="btn btn-primary btn-sm">
        Browse Courses
      </Link>
    </div>
  );
}
