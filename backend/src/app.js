import express from "express";
import userRoutes from "./modules/users/user.routes.js";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "URL Shortener API is running",
  });
});

export default app;
