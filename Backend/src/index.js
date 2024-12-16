import express from "express";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "../src/routes/messageRoute.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

// Increase payload size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

dotenv.config();

const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.Node_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle SPA routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });

}

server.listen(PORT, () => {
  console.log("Server is running on PORT : " + PORT);
  connectDB();
});
