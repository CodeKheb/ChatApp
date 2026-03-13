/**
 * Message Router Module
 * Routes encrypted messages to appropriate recipients based on session mode
 * Supports public broadcast, room-based, and direct peer-to-peer messaging
 */

import { socketMap } from "./sessions.js";

/**
 * Route a message to the appropriate recipient(s)
 * @param {Socket} socket - The sending socket
 * @param {Object} message - Encrypted message { iv, ciphertext }
 * @returns {Object} Result object { ok: boolean, reason?: string }
 */
export default function routeMessage(socket, message) {
  const session = socketMap.get(socket.id);

    // Check if socket has an active session
    if (!session) {
        return {ok: false, reason: "no-session"};
    }

    // Route message based on current session mode
    switch (session.sessionMode) {
        /**
         * DIRECT MODE: Send message to specific connected peer
         */
        case "direct":
            if (!session.connected_id) {
                return {ok: false, reason: "no-id"};
            }
            socket.to(session.connected_id).emit("server-message", message);
            return {ok: true};
        /**
         * ROOM MODE: Broadcast message to all clients in the room
         */
        case "room":
            if (!session.connected_room) {
                return {ok: false, reason: "no-room"};
            }
            socket.to(session.connected_room).emit("server-message", message);
            return {ok: true};
        /**
         * PUBLIC MODE: Broadcast message to all connected clients
         */
        case "public":
            socket.broadcast.emit("server-message", message);
            return { ok: true };
        /**
         * UNKNOWN MODE: Invalid session mode
         */
        default:
            return {ok: false, reason: "unknown-mode"};
    }
}
