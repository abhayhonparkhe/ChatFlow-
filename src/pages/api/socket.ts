// pages/api/socket.ts
import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponse } from "next";
import admin from 'firebase-admin';

// Initialize Firebase Admin with environment variables
if (!admin.apps.length) {
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

// Extend the response to hold the socket server instance
type NextApiResponseWithSocket = NextApiResponse & {
  socket: NextApiResponse["socket"] & {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  // If Socket.IO server is already attached, just return
  if (res.socket.server.io) {
    console.log("✅ Socket.IO already running.");
    res.end();
    return;
  }

  console.log("🧠 Starting new Socket.IO server...");

  const io = new SocketIOServer(res.socket.server, {
    path: "/api/socket",
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`📦 ${socket.id} joined room ${room}`);
    });

    socket.on("chatMessage", async ({ message, username, room }) => {
      const msg = {
        user: username,
        message,
        timestamp: admin.firestore.Timestamp.now(),
      };

      await db.collection('rooms').doc(room).collection('messages').add(msg);
      io.to(room).emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  res.socket.server.io = io;

  res.end();
}