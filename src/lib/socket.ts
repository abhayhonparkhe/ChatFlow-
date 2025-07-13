// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io({
      path: "/api/socket",
    });
  }
  return socket;
};
