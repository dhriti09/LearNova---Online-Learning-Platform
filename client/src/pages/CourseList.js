import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import CourseCard from "../components/CourseCard";
import { CourseCardSkeletonGrid } from "../components/CourseCardSkeleton";
import EmptyState from "../components/EmptyState";
import { IconSearch, IconInbox, IconAlertCircle } from "../components/Icons";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Title: A to Z" },
];

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "newest";

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => setCourses(res.data))
      .catch(() => setError("Could not load courses"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...courses];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.instructor?.name?.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    return list;
  }, [courses, query, sort]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="page container">
      <div className="page-header">
        <h1>Explore Courses</h1>
        <p>Learn from carefully designed courses and build practical skills.</p>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <IconSearch size={17} />
          <input
            className="input"
            type="search"
            placeholder="Search courses, topics, or instructors..."
            value={query}
            onChange={(e) => updateParam("q", e.target.value)}
            aria-label="Search courses"
          />
        </div>
        <select
          className="select toolbar-select"
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          aria-label="Sort courses"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <CourseCardSkeletonGrid count={8} />}

      {!loading && error && (
        <EmptyState
          icon={<IconAlertCircle size={26} />}
          title="Could not load courses"
          description="Something went wrong while fetching the catalog. Please refresh to try again."
        />
      )}

      {!loading && !error && (
        <>
          <p className="results-count">
            {filtered.length} {filtered.length === 1 ? "course" : "courses"}
            {query ? ` matching "${query}"` : ""}
          </p>

          {filtered.length === 0 ? (
            <EmptyState
              icon={<IconInbox size={26} />}
              title="No courses found"
              description={
                query
                  ? "Try a different search term, or clear your search to see everything."
                  : "Check back soon \u2014 new courses show up here as instructors publish them."
              }
              action={
                query ? (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => updateParam("q", "")}
                  >
                    Clear search
                  </button>
                ) : null
              }
            />
          ) : (
            <div className="course-grid">
              {filtered.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
