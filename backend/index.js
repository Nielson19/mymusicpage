import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoute.js";
import musicRoutes from "./routes/music.route.js";

dotenv.config();
const app = express();

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_DB)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.use("/api", authRouter);
app.use("/api/music", musicRoutes)

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))