// Vercel serverless entry: every /api/* request is handled by the Express app.

// Loading the app builds the JWT strategy and needs JWT_SECRET, so missing
// configuration is reported as a readable JSON error instead of a crash.
function missingConfig() {
  const missing = [];
  if (!process.env.JWT_SECRET) missing.push("JWT_SECRET");
  const hasMongo =
    process.env.DB_URL ||
    (process.env.MONGO_USER &&
      process.env.MONGO_PASSWORD &&
      process.env.MONGO_HOST);
  if (!hasMongo) missing.push("DB_URL (or MONGO_USER/MONGO_PASSWORD/MONGO_HOST)");
  return missing;
}

module.exports = async (req, res) => {
  const missing = missingConfig();
  if (missing.length) {
    res.status(500).json({
      message: `Server is missing environment variables: ${missing.join(", ")}`,
    });
    return;
  }

  let app;
  try {
    // eslint-disable-next-line global-require
    app = require("../server/app");
  } catch (error) {
    console.error("Failed to load the API.", error);
    res.status(500).json({ message: "Server configuration error" });
    return;
  }

  try {
    await app.connectToDatabase();
  } catch (error) {
    console.error("MongoDB connection failed.", error.message);
    res.status(503).json({ message: "Database unavailable" });
    return;
  }

  return app(req, res);
};
