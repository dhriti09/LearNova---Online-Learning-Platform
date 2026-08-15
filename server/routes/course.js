const router = require("express").Router();
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const Course = require("../models/Course");

const requireAuth = passport.authenticate("jwt", { session: false });

// @route   GET /api/courses
// @desc    List all courses (public - no login required to browse)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/courses/:id
// @desc    Get a single course (public)
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/courses
// @desc    Create a course (logged-in instructors only)
router.post(
  "/",
  requireAuth,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
  ],
  async (req, res) => {
    if (req.user.role !== "instructor") {
      return res
        .status(403)
        .json({ message: "Only instructors can create courses" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, price, thumbnail, lessons } = req.body;
      const course = await Course.create({
        title,
        description,
        price,
        thumbnail,
        lessons,
        instructor: req.user._id,
      });
      res.status(201).json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   PUT /api/courses/:id
// @desc    Update a course (owning instructor only)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, price, thumbnail, lessons } = req.body;
    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (price !== undefined) course.price = price;
    if (thumbnail !== undefined) course.thumbnail = thumbnail;
    if (lessons !== undefined) course.lessons = lessons;

    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course (owning instructor only)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll the logged-in student in a course
router.post("/:id/enroll", requireAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const User = require("../models/User");
    const user = await User.findById(req.user._id);

    if (user.enrolledCourses.some((c) => c.toString() === course._id.toString())) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    user.enrolledCourses.push(course._id);
    await user.save();

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
