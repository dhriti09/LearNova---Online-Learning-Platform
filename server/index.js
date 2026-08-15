const mongoose = require("mongoose");
const app = require("./app");
const { connectToDatabase, uri } = app;

if (!uri) {
  console.error(
    "MongoDB configuration is missing. Fill in server/.env before starting the server."
  );
  process.exit(1);
}

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await connectToDatabase();
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
