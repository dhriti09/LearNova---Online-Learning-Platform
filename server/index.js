const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const app = express();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;

require("./config/passport")(passport);

// Build the Atlas URI from separate environment variables so passwords
// containing special characters are encoded correctly.
const {
  DB_URL,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_DB = "online-learning-platform",
} = process.env;

const uri =
  DB_URL ||
  (MONGO_USER && MONGO_PASSWORD && MONGO_HOST
    ? `mongodb+srv://${encodeURIComponent(MONGO_USER)}:${encodeURIComponent(
        MONGO_PASSWORD
      )}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority&appName=dhriti09`
    : null);

if (!uri) {
  console.error(
    "MongoDB configuration is missing. Fill in server/.env before starting the server."
  );
  process.exit(1);
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

app.use("/api/user", authRoute);
app.use("/api/courses", courseRoute);

// simple health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas.");
    console.log(`Database: ${mongoose.connection.name}`);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed.");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
