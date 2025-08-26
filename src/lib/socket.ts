// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    // Get the base URL for WebSocket connection
    const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';

    socket = io(baseURL, {
      path: "/api/socket",
      addTrailingSlash: false,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 20000,
      transports: ['polling', 'websocket'] // Start with polling, then upgrade to websocket
    });

    // Debug listeners
    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });
  }
  return socket;
};
