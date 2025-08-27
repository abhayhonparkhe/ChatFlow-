import { io } from "socket.io-client";

export const getSocket = () => {
  const socket = io("", {
    path: "/api/socket",
    addTrailingSlash: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    // Important for Vercel: use long-polling only
    transports: ["polling"],
    upgrade: false,
    autoConnect: true,
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });

  return socket;
};