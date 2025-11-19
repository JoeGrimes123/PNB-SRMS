import "dotenv/config";
import express from "express";
import cors from "cors";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: "http://localhost:5173", // Adjust if your frontend port is different
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.all("/api/auth/*", toNodeHandler(auth));

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
