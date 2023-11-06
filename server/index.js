import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// import routes
import userRoutes from "./routes/users.js";
import itemRoutes from "./routes/labItem.js";
import adminRoutes from "./routes/admin.js";

const app = express();

// MIDDLEWARE? What each of these does?
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  next();
});
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

app.use("/user", userRoutes);

// item route
app.use("/item", itemRoutes);

// admin route
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
