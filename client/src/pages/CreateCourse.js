import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import {
  IconAlertCircle,
  IconPlus,
  IconTrash,
  IconLayers,
} from "../components/Icons";

const DESCRIPTION_LIMIT = 600;

function emptyLesson() {
  return { title: "", content: "", videoUrl: "" };
}

export default function CreateCourse() {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    thumbnail: "",
  });
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(isEditMode);

  useEffect(() => {
    if (!isEditMode) return;
    api
      .get(`/courses/${id}`)
      .then((res) => {
        const c = res.data;
        setForm({
          title: c.title || "",
          description: c.description || "",
          price: c.price || 0,
          thumbnail: c.thumbnail || "",
        });
        setLessons(
          (c.lessons || []).map((l) => ({
            title: l.title || "",
            content: l.content || "",
            videoUrl: l.videoUrl || "",
          }))
        );
      })
      .catch(() => setError("Could not load this course for editing"))
      .finally(() => setLoadingCourse(false));
  }, [id, isEditMode]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateLesson = (i, key, value) => {
    setLessons((prev) =>
      prev.map((lesson, idx) => (idx === i ? { ...lesson, [key]: value } : lesson))
    );
  };

  const addLesson = () => setLessons((prev) => [...prev, emptyLesson()]);
  const removeLesson = (i) =>
    setLessons((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price) || 0,
        lessons: lessons.filter((l) => l.title.trim()),
      };
      if (isEditMode) {
        await api.put(`/courses/${id}`, payload);
        toast.success("Course updated successfully");
        navigate(`/courses/${id}`);
      } else {
        const res = await api.post("/courses", payload);
        toast.success("Course published successfully");
        navigate(`/courses/${res.data._id}`);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isEditMode ? "Could not update course" : "Could not create course")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingCourse) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading course...</p>
      </div>
    );
  }

  return (
    <div className="page container">
      <div className="form-page-shell">
        <h1>{isEditMode ? "Edit Course" : "Create New Course"}</h1>
        <p>
          {isEditMode
            ? "Update your course details below."
            : "Fill in the details below to publish a new course."}
        </p>

        {error && (
          <div className="form-banner form-banner-error">
            <IconAlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-card" style={{ marginBottom: 20 }}>
            <h2>Course Information</h2>
            <p className="form-card-sub">The core details learners will see first.</p>

            <div className="field">
              <label htmlFor="title">Course title</label>
              <input
                id="title"
                className="input"
                type="text"
                name="title"
                placeholder="e.g. React.js Complete Course"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="textarea"
                name="description"
                placeholder="Explain what students will learn in this course..."
                value={form.description}
                onChange={handleChange}
                maxLength={DESCRIPTION_LIMIT}
                required
              />
              <span className="char-count">
                {form.description.length}/{DESCRIPTION_LIMIT}
              </span>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="price">Price ({"\u20b9"})</label>
                <input
                  id="price"
                  className="input"
                  type="number"
                  name="price"
                  min={0}
                  placeholder="0"
                  value={form.price}
                  onChange={handleChange}
                />
                <span className="field-hint">Leave as 0 to offer this course for free.</span>
              </div>
              <div className="field">
                <label htmlFor="thumbnail">Thumbnail URL (optional)</label>
                <input
                  id="thumbnail"
                  className="input"
                  type="url"
                  name="thumbnail"
                  placeholder="https://..."
                  value={form.thumbnail}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-card">
            <div className="section-head-row" style={{ marginBottom: 4 }}>
              <div>
                <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <IconLayers size={18} /> Lessons
                </h2>
                <p className="form-card-sub" style={{ border: "none", paddingBottom: 0 }}>
                  Optional &mdash; you can add lessons now or later.
                </p>
              </div>
            </div>

            {lessons.map((lesson, i) => (
              <div
                key={i}
                className="field"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: 16,
                  marginTop: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <label style={{ margin: 0 }}>Lesson {i + 1}</label>
                  <button
                    type="button"
                    className="btn-danger-text btn-sm"
                    onClick={() => removeLesson(i)}
                    aria-label={`Remove lesson ${i + 1}`}
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
                <input
                  className="input"
                  type="text"
                  placeholder="Lesson title"
                  value={lesson.title}
                  onChange={(e) => updateLesson(i, "title", e.target.value)}
                  style={{ marginBottom: 10 }}
                />
                <textarea
                  className="textarea"
                  placeholder="Lesson content or notes (optional)"
                  value={lesson.content}
                  onChange={(e) => updateLesson(i, "content", e.target.value)}
                  style={{ minHeight: 80, marginBottom: 10 }}
                />
                <input
                  className="input"
                  type="url"
                  placeholder="Video URL (optional)"
                  value={lesson.videoUrl}
                  onChange={(e) => updateLesson(i, "videoUrl", e.target.value)}
                />
              </div>
            ))}

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={addLesson}
              style={{ marginTop: 16 }}
            >
              <IconPlus size={16} /> Add Lesson
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ marginTop: 24 }}
            disabled={submitting}
          >
            {submitting
              ? isEditMode
                ? "Saving..."
                : "Publishing..."
              : isEditMode
              ? "Save Changes"
              : "Publish Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
