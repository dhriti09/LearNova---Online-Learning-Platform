import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import { CourseCardSkeletonGrid } from "../components/CourseCardSkeleton";
import EmptyState from "../components/EmptyState";
import {
  IconArrowRight,
  IconBook,
  IconUsers,
  IconChalkboard,
  IconClock,
  IconTarget,
  IconGlobe,
  IconTrendingUp,
  IconSparkle,
  IconInbox,
} from "../components/Icons";

export default function Home() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => setCourses(res.data))
      .catch(() => setError("Could not load courses"))
      .finally(() => setLoading(false));
  }, []);

  const instructorCount = new Set(
    courses.map((c) => c.instructor?._id).filter(Boolean)
  ).size;
  const lessonCount = courses.reduce(
    (sum, c) => sum + (c.lessons?.length || 0),
    0
  );
  const popularCourses = courses.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-grid-pattern" aria-hidden="true" />
        <div className="hero-blob hero-blob-1" aria-hidden="true" />
        <div className="hero-blob hero-blob-2" aria-hidden="true" />

        <div className="container hero-inner">
          <div className="slide-up">
            <span className="hero-eyebrow">
              <IconSparkle size={14} /> A better way to learn
            </span>
            <h1 className="hero-title">
              Learn skills.
              <br />
              <span>Build your future.</span>
            </h1>
            <p className="hero-desc">
              Learnova connects you with practical, instructor-led courses
              you can learn at your own pace &mdash; and gives instructors a
              simple way to share what they know.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary">
                Explore Courses <IconArrowRight size={17} />
              </Link>
              <Link
                to={user ? "/create-course" : "/register?role=instructor"}
                className="btn btn-secondary"
              >
                Become an Instructor
              </Link>
            </div>

            <div className="hero-trust">
              <div className="hero-trust-item">
                <span className="hero-trust-value">
                  {loading ? "\u2013" : courses.length}
                </span>
                <span className="hero-trust-label">Courses live</span>
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-value">
                  {loading ? "\u2013" : instructorCount}
                </span>
                <span className="hero-trust-label">Instructors teaching</span>
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-value">
                  {loading ? "\u2013" : lessonCount}
                </span>
                <span className="hero-trust-label">Lessons published</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-float-card hero-card-main">
              <div className="hero-card-media">
                <IconChalkboard size={30} />
              </div>
              <div className="hero-card-body">
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  Data Structures &amp; Algorithms
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    marginTop: 4,
                  }}
                >
                  Self-paced &middot; Lifetime access
                </div>
              </div>
            </div>

            <div className="hero-float-card hero-card-progress">
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                Your progress
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: "68%" }} />
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  marginTop: 6,
                }}
              >
                Continue learning
              </div>
            </div>

            <div className="hero-float-card hero-card-stat">
              <span className="stat-card-icon" style={{ width: 36, height: 36 }}>
                <IconTrendingUp size={18} />
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  Skill growth
                </div>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                  Track as you learn
                </div>
              </div>
            </div>

            <div className="hero-float-card hero-card-people">
              <span className="stat-card-icon" style={{ width: 36, height: 36 }}>
                <IconUsers size={18} />
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Learning together
                </div>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                  Join the community
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Why choose us */}
        <section className="section-tight">
          <div className="section-header">
            <span className="eyebrow">Why Learnova</span>
            <h2 className="section-title">Built around how people actually learn</h2>
            <p className="section-sub">
              No clutter, no gimmicks &mdash; just clear courses and the tools
              to work through them at your own speed.
            </p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <span className="feature-icon">
                <IconClock size={22} />
              </span>
              <h3>Learn at your own pace</h3>
              <p>Every course stays available to you, so you can move as fast or slow as you need.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">
                <IconChalkboard size={22} />
              </span>
              <h3>Expert instructors</h3>
              <p>Courses are built and taught by instructors who create the content themselves.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">
                <IconTarget size={22} />
              </span>
              <h3>Practical courses</h3>
              <p>Lessons are structured around real, applicable skills rather than filler content.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">
                <IconGlobe size={22} />
              </span>
              <h3>Learn from anywhere</h3>
              <p>Your enrolled courses go with you &mdash; pick up right where you left off.</p>
            </div>
          </div>
        </section>

        {/* Popular courses */}
        <section className="section-tight">
          <div className="section-head-row">
            <div>
              <span className="eyebrow" style={{ justifyContent: "flex-start" }}>
                <IconBook size={14} /> Course catalog
              </span>
              <h2 className="section-title">Popular courses</h2>
            </div>
            <Link to="/courses" className="btn btn-secondary btn-sm">
              View all courses <IconArrowRight size={15} />
            </Link>
          </div>

          {loading && <CourseCardSkeletonGrid count={4} />}

          {!loading && error && (
            <EmptyState
              icon={<IconInbox size={26} />}
              title="Could not load courses"
              description="Please refresh the page to try again."
            />
          )}

          {!loading && !error && popularCourses.length === 0 && (
            <EmptyState
              icon={<IconInbox size={26} />}
              title="No courses yet"
              description="Courses will show up here as soon as instructors publish them."
              action={
                <Link to="/register?role=instructor" className="btn btn-primary btn-sm">
                  Become the first instructor
                </Link>
              }
            />
          )}

          {!loading && !error && popularCourses.length > 0 && (
            <div className="course-grid">
              {popularCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </section>

        {/* How it works */}
        <section className="section-tight">
          <div className="section-header">
            <span className="eyebrow">Getting started</span>
            <h2 className="section-title">How it works</h2>
          </div>
          <div className="steps-row">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Explore</h3>
              <p>Browse the catalog and find a course that matches what you want to learn.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Enroll</h3>
              <p>Sign up in seconds and enroll in any course &mdash; it's added to your dashboard instantly.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Learn &amp; Grow</h3>
              <p>Work through the lessons at your own pace and track what you've enrolled in.</p>
            </div>
          </div>
        </section>

        {/* Instructor CTA */}
        <section className="section-tight">
          <div className="dark-section">
            <div className="dark-section-content">
              <span
                className="stat-card-icon"
                style={{ background: "rgba(79,70,229,0.2)", color: "#a5b4fc" }}
              >
                <IconChalkboard size={22} />
              </span>
              <h2>Have knowledge to share?</h2>
              <p>
                Become an instructor and create courses for learners looking
                to build exactly the skills you already have.
              </p>
              <Link
                to={user ? "/create-course" : "/register?role=instructor"}
                className="btn btn-primary"
              >
                Start Teaching <IconArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <h2>Ready to start learning?</h2>
          <p style={{ maxWidth: 460 }}>
            Create a free account and enroll in your first course today.
          </p>
          <div className="hero-actions" style={{ marginTop: 8 }}>
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
            </Link>
            {!user && (
              <Link to="/register" className="btn btn-secondary">
                Create Account
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
