// // lib/socket.ts
// import { io } from "socket.io-client";

// const baseURL = process.env.NODE_ENV === 'production' 
//   ? process.env.NEXT_PUBLIC_SOCKET_URL 
//   : '';

// export const getSocket = () => {
//   const socket = io(baseURL, {
//     path: "/api/socket",
//     addTrailingSlash: false,
//     reconnectionAttempts: 5,
//     reconnectionDelay: 1000,
//     transports: ["websocket", "polling"], // Allow both WebSocket and polling
//     autoConnect: true,
//   });

//   socket.on("connect_error", (err) => {
//     console.error("Socket connection error:", err);
//   });

//   return socket;
// };

// src/lib/socket.ts
import { io } from "socket.io-client";

// Use same-origin in both dev and prod
export const getSocket = () => {
  const socket = io("", {
    path: "/api/socket",
    addTrailingSlash: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ["websocket", "polling"],
    autoConnect: true,
    withCredentials: true,
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });

  return socket;
};
