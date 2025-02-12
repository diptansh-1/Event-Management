import { Server } from 'socket.io';

let io = null;

export function initWebSocket(server) {
  io = new Server(server, {
    path: '/api/socket',
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');
  });

  // Store in global for API routes access
  global.io = io;
}

export function getIO() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}