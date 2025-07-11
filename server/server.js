require("dotenv").config();
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
