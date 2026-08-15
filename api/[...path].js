// Vercel serverless entry: every /api/* request is handled by the Express app.
const app = require("../server/app");

module.exports = async (req, res) => {
  try {
    await app.connectToDatabase();
  } catch (error) {
    console.error("MongoDB connection failed.", error.message);
    res.status(503).json({ message: "Database unavailable" });
    return;
  }
  return app(req, res);
};
