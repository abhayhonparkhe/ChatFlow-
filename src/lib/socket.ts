// src/lib/socket.ts
import { io } from "socket.io-client";

export const getSocket = () => {
  const socket = io("", {
    path: "/api/socket",
    addTrailingSlash: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ["polling"],    // force polling on Vercel
    upgrade: false,             // don't try websocket
    autoConnect: true,
    withCredentials: false,     // keep CORS simple
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });

  return socket;
};