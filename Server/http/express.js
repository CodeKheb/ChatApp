/**
 * Express Server Configuration
 * Sets up HTTP routes and serves static client files
 * Note: Real-time messaging is handled by Socket.IO in server.js
 */

import express from 'express';
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Get current directory for ES6 modules (replaces __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (HTML, CSS, JS) from the Client folder
app.use(express.static(path.join(__dirname, "../../Client")));
// Parse incoming JSON requests
app.use(express.json());

/**
 * GET / (GET Route)
 * Returns a simple status response
 * Testing endpoint to verify server is running
 */
app.get("/", (req, res) => {
    res.send({ status: "Get route working" });
})

/**
 * POST /post (POST Route)
 * Accepts JSON body and returns status
 * Testing endpoint for POST requests
 */
app.post("/post", (req, res) => {
    const requestContent = req.body;
    res.send({ status: "Post route working" });
})

/**
 * PATCH /patch (PATCH Route)
 * Testing endpoint for PATCH requests
 */
app.patch("/patch", (req, res) => {
    res.send({ status: "Patch route working" });
})

/**
 * DELETE /delete (DELETE Route)
 * Testing endpoint for DELETE requests
 */
app.delete("/delete", (req, res) => {
    res.send({ status: "Delete route working" });
})

export default app;
