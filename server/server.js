import dotenv from "dotenv"
dotenv.config();
import cors from "cors";


import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./db/connection.db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import { app, server } from "./socket/socket.js";

connectDB();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // In production allow all — remove this fallback if you want strict CORS
            callback(null, true);
        }
    },
    credentials: true
}));


const PORT = process.env.PORT || 5000;

app.use('/api/v1/user', userRoute)
app.use('/api/v1/messages', messageRoute)


app.use(errorMiddleware);



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})