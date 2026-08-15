import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import { CourseCardSkeletonGrid } from "../components/CourseCardSkeleton";
import {
  IconBook,
  IconLayers,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconInbox,
  IconChalkboard,
  IconAlertCircle,
} from "../components/Icons";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="page container">
      {user.role === "instructor" ? (
        <InstructorDashboard user={user} />
      ) : (
        <StudentDashboard user={user} />
      )}
    </div>
  );
}

function StudentDashboard({ user }) {
  const { refreshUser } = useAuth();
  const [totalCourses, setTotalCourses] = useState(null);
  const [enrolledStatus, setEnrolledStatus] = useState(
    Array.isArray(user.enrolledCourses) ? "ready" : "loading"
  );
  const [enrolledError, setEnrolledError] = useState("");

  const loadTotal = useCallback(() => {
    api
      .get("/courses")
      .then((res) => setTotalCourses(res.data.length))
      .catch(() => setTotalCourses(null));
  }, []);

  // GET /api/user/me returns the profile with populated enrolledCourses.
  const loadEnrolled = useCallback(() => {
    setEnrolledStatus("loading");
    setEnrolledError("");
    loadTotal();
    refreshUser()
      .then(() => setEnrolledStatus("ready"))
      .catch((err) => {
        setEnrolledError(
          err.response?.data?.message ||
            "We couldn't load your enrolled courses. Please try again."
        );
        setEnrolledStatus("error");
      });
  }, [refreshUser, loadTotal]);

  useEffect(() => {
    loadEnrolled();
  }, [loadEnrolled]);

  const enrolled = user.enrolledCourses || [];
  const enrolledLoaded = enrolledStatus === "ready";

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>{greeting()}, {user.name?.split(" ")[0]} {"\uD83D\uDC4B"}</h1>
          <p>Continue your learning journey.</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <StatCard
          icon={<IconBook size={20} />}
          value={enrolledLoaded ? enrolled.length : "\u2013"}
          label="Enrolled Courses"
        />
        <StatCard
          icon={<IconLayers size={20} />}
          value={totalCourses === null ? "\u2013" : totalCourses}
          label="Courses Available"
        />
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-head">
          <h2>My Learning</h2>
          <Link to="/courses" className="btn btn-secondary btn-sm">
            Browse more courses
          </Link>
        </div>

        {enrolledStatus === "loading" && <CourseCardSkeletonGrid count={4} />}

        {enrolledStatus === "error" && (
          <EmptyState
            icon={<IconAlertCircle size={26} />}
            title="Couldn't load your courses"
            description={enrolledError}
            action={
              <button className="btn btn-primary btn-sm" onClick={loadEnrolled}>
                Try again
              </button>
            }
          />
        )}

        {enrolledLoaded && enrolled.length === 0 && (
          <EmptyState
            icon={<IconInbox size={26} />}
            title="You haven't enrolled in any courses yet"
            description="Explore the catalog and enroll in your first course to see it here."
            action={
              <Link to="/courses" className="btn btn-primary btn-sm">
                Explore Courses
              </Link>
            }
          />
        )}

        {enrolledLoaded && enrolled.length > 0 && (
          <div className="course-grid">
            {enrolled.map((course) => (
              <div className="enrolled-card" key={course._id}>
                <div className="enrolled-card-media">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <IconBook size={32} />
                  )}
                </div>
                <div className="enrolled-card-body">
                  <span className="badge badge-enrolled">Enrolled</span>
                  <div className="enrolled-card-title">{course.title}</div>
                  <div className="enrolled-card-meta">
                    By {course.instructor?.name || "Unknown instructor"}
                  </div>
                  <div className="enrolled-card-footer">
                    <Link
                      to={`/courses/${course._id}`}
                      className="btn btn-primary btn-sm btn-block"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function InstructorDashboard({ user }) {
  const toast = useToast();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadCourses = () => {
    setLoading(true);
    api
      .get("/courses")
      .then((res) => {
        const mine = res.data.filter((c) => c.instructor?._id === user.id);
        setCourses(mine);
      })
      .catch(() => toast.error("Could not load your courses"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalLessons = courses.reduce(
    (sum, c) => sum + (c.lessons?.length || 0),
    0
  );

  const handleDelete = async (courseId, title) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setDeletingId(courseId);
    try {
      await api.delete(`/courses/${courseId}`);
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
      toast.success("Course deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete course");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user.name?.split(" ")[0]}</h1>
          <p>Your teaching overview.</p>
        </div>
        <Link to="/create-course" className="btn btn-primary">
          <IconPlus size={17} /> Create New Course
        </Link>
      </div>

      <div className="dashboard-stats">
        <StatCard
          icon={<IconChalkboard size={20} />}
          value={loading ? "\u2013" : courses.length}
          label="Total Courses"
        />
        <StatCard
          icon={<IconLayers size={20} />}
          value={loading ? "\u2013" : totalLessons}
          label="Total Lessons"
        />
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-head">
          <h2>My Courses</h2>
        </div>

        {loading && <CourseCardSkeletonGrid count={3} />}

        {!loading && courses.length === 0 && (
          <EmptyState
            icon={<IconInbox size={26} />}
            title="You haven't published any courses yet"
            description="Create your first course to start teaching on Learnova."
            action={
              <Link to="/create-course" className="btn btn-primary btn-sm">
                Create New Course
              </Link>
            }
          />
        )}

        {!loading &&
          courses.map((course) => (
            <div className="instructor-course-row" key={course._id}>
              <div className="instructor-course-thumb">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <IconBook size={22} />
                )}
              </div>
              <div className="instructor-course-info">
                <div className="instructor-course-title">{course.title}</div>
                <div className="instructor-course-meta">
                  {course.lessons?.length || 0} lessons &middot; {course.price ? `\u20b9${course.price}` : "Free"}
                </div>
              </div>
              <div className="instructor-course-actions">
                <Link
                  to={`/courses/${course._id}`}
                  className="btn btn-ghost btn-sm"
                  aria-label={`View ${course.title}`}
                >
                  <IconEye size={16} />
                </Link>
                <Link
                  to={`/edit-course/${course._id}`}
                  className="btn btn-ghost btn-sm"
                  aria-label={`Edit ${course.title}`}
                >
                  <IconEdit size={16} />
                </Link>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleDelete(course._id, course.title)}
                  disabled={deletingId === course._id}
                  aria-label={`Delete ${course.title}`}
                  style={{ color: "var(--danger)" }}
                >
                  <IconTrash size={16} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
