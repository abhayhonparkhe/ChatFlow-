// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    // Get the base URL
    const baseURL = process.env.NODE_ENV === 'production'
      ? `https://${window.location.host}`
      : 'http://localhost:3000';

    socket = io(baseURL, {
      path: "/api/socket",
      transports: ['websocket'],
      addTrailingSlash: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
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
