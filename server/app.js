const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

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

// Serverless platforms reuse a warm process for many requests, so the
// connection promise is cached instead of reconnecting per request.
let connection = null;

function connectToDatabase() {
  if (!uri) {
    return Promise.reject(
      new Error(
        "MongoDB configuration is missing. Set DB_URL or MONGO_USER/MONGO_PASSWORD/MONGO_HOST."
      )
    );
  }
  if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose);
  if (!connection) {
    connection = mongoose.connect(uri).catch((error) => {
      connection = null;
      throw error;
    });
  }
  return connection;
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

app.use("/api/user", authRoute);
app.use("/api/courses", courseRoute);

// simple health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

module.exports = app;
module.exports.connectToDatabase = connectToDatabase;
module.exports.uri = uri;
