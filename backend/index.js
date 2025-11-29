import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { ExpressAuth } from "@auth/express";
import Spotify from "@auth/express/providers/spotify";
import authRouter from "./routes/authRoute.js";
import dotenv from "dotenv";


dotenv.config();
const app = express();

//connect to db
mongoose.connect(process.env.MONGO_DB)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use("/api", authRouter);
app.use("/auth/*", ExpressAuth(
    {providers: [Spotify({
        clientId: process.env.AUTH_SPOTIFY_ID, 
        clientSecret: process.env.AUTH_SPOTIFY_SECRET})],
        callbacks: {
             async redirect() {
                return "http://127.0.0.1:3002/dashboard";
            },
        }
    }
));


//port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
