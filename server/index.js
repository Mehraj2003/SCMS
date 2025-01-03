import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import dotenv from "dotenv";


const nodeVersion = parseFloat(process.versions.node);

dotenv.config();

if (nodeVersion < 14) {
  throw new Error("Node.js version must be 14 or higher!");
}


const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Up & Running on Port ${PORT}!`));

mongoose
  .connect(process.env.DB_URL  || "mongodb://localhost:27017/SCMS")
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log(err));

app.use(cors());

app.use(express.json());

app.use("/api/v1/", routes);