const express = require("express");
const sequelize = require("./server/database");
const songRoutes = require("./server/routes/song");

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON data

app.use("/api", songRoutes);

// Sync database and start the server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running at http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err.message);
  });
