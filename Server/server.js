/**
 * Server Entry Point
 * Sets up Express server and Socket.IO connection with CORS enabled
 * Real-time communication for chat application with AES-GCM encryption
 */

import app from "./http/express.js";
import { Server } from "socket.io";
import socketServer from "./Socket/socketServer.js";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get port from environment variable or default to 3000
const port = process.env.PORT || 3000;
console.log("PORT_NUMBER:", process.env.PORT);
const serverExpress = app.listen(port, () =>
  console.log(`Listening at port ${port}`),
);

/**
 * Initialize Socket.IO server with CORS configuration
 * Allows cross-origin connections with GET and POST methods
 */
export const io = new Server(serverExpress, {
  cors: {
    origin: "*", // Allow connections from any origin
    methods: ["GET", "POST"],
  },
});

/**
 * Handle new Socket.IO connections
 * Each client connection triggers this handler
 */
io.on("connection", (socket) => {
  socketServer(socket);
});
