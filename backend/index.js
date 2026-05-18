// Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import client from 'prom-client';   



// Files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import {logger} from './utils/logger.js'
import { log } from "console";

// Configuration
dotenv.config();
connectDB();


const app = express();

// middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register})


// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);


app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType)
    const metrics = await client.register.metrics()
    res.send(metrics)
})

app.get("/healthStatus", (req, res) => {
    logger.info('Health check requested');
    res.status(200).send('Backend server healthy!!!');
})
// app.get("/apiOne", (req, res) => {
//     logger.info('API One endpoint called');
//     // res.status(200).send('apiOne is working!!!');
//     res.status(500).send({
//         success: false,
//         message: 'Something went wrong in apiOne'
//     });
// })

app.get("/apiOne", async (req, res) => {
    try {
        logger.info("API One endpoint called");

        // Random success/failure
        const isSuccess = Math.random() < 0.2; // 20% success, 80% failure

        if (!isSuccess) {
            logger.error("API One failed randomly");
            throw new Error("API One failed randomly");
        }

        // Success response
        logger.info("API One success");

        res.status(200).json({
            success: true,
            message: "apiOne is working!!!"
        });

    } catch (error) {

        // Error log
        logger.error({
            message: error.message,
            stack: error.stack
        });

        // Error response
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.get("/", (req, res) => {
    logger.info('Root endpoint called');
    res.status(200).send('Backend server is running!!!');
})

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
