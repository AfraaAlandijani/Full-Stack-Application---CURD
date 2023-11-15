import express from "express";
import cors from "cors";
import morgan from "morgan";

import { dev } from "./config/index.js";
import { rateLimit } from "express-rate-limit";
import productsRoutes from "./routes/productsRoutes.js";

const app = express();
const port = dev.app.port || 8080;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes).
  message:
    "Requestes exceeds limits within 1 minutes. Please try after a minute",
});

// Apply the rate limiting middleware to all requests.
//app.use(limiter)

//In case frontend & backend are running in different ports
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products",productsRoutes);

app.get("/", limiter, (req, res) => {
  res.send("Hello World");
});

// Handle client error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

// Handle server error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});
