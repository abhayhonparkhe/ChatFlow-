// pages/api/socket.ts
import { Server as SocketIOServer } from 'socket.io';
import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// Add custom type for socket server
import { Socket as NetSocket } from 'net';
import { Server as HTTPServer } from 'http';

interface SocketServer extends HTTPServer {
  io?: SocketIOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket?.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    const io = new SocketIOServer(httpServer, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
      transports: ['websocket'],
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('joinRoom', (room: string) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });

      socket.on('chatMessage', async (data: {
        username: string;
        message: string;
        room: string;
      }) => {
        try {
          // Add message to Firestore
          const docRef = await addDoc(
            collection(db, 'rooms', data.room, 'messages'),
            {
              user: data.username,
              message: data.message,
              timestamp: serverTimestamp(),
            }
          );

          // Broadcast to room with proper typing
          io.to(data.room).emit('chatMessage', {
            id: docRef.id,
            user: data.username,
            message: data.message,
            timestamp: {
              seconds: Math.floor(Date.now() / 1000),
              nanoseconds: 0,
            },
          });
        } catch (error: unknown) {
          console.error('Error saving message:', error);
          socket.emit('messageError', { 
            error: 'Failed to send message',
            details: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      });

      socket.on('error', (error: Error) => {
        console.error('Socket error:', error);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;