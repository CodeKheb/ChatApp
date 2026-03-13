/**
 * Session Management Module
 * Manages socket session states and connection modes
 * Tracks whether each socket is in public, room, or direct messaging mode
 */

/**
 * Map to store session information for each connected socket
 * Key: socketId
 * Value: { sessionMode, connected_id, connected_room }
 */
export let socketMap = new Map();

/**
 * Set socket to public messaging mode
 * Public mode broadcasts messages to all connected clients
 * @param {string} socketId - The socket ID to set public
 */
export function setPublic(socketId) {
        socketMap.set(socketId, {sessionMode: "public", connected_id: null, connected_room: null});
    };

/**
 * Establish direct connection between two sockets
 * Messages sent in direct mode go only to the connected peer
 * @param {string} socket1 - First socket ID
 * @param {string} socket2 - Second socket ID (peer)
 */
export function directConnect(socket1, socket2) {
        socketMap.set(socket1, {sessionMode: "direct", connected_id: socket2, connected_room: null});
        socketMap.set(socket2, {sessionMode: "direct", connected_id: socket1, connected_room: null});
    };

/**
 * Set socket to room messaging mode
 * Room mode broadcasts messages to all clients in the same room
 * @param {string} socketId - The socket ID
 * @param {string} room - The room name/ID to join
 */
export function roomConnect(socketId, room) {
        socketMap.set(socketId, {sessionMode: "room", connected_id: null, connected_room: room})
    };
