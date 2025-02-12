import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Initialize Socket.IO
  const io = new Server(server, {
    path: '/api/socket.io', // Match client connection path
    cors: {
      origin: 'http://localhost:3000', // Explicitly allow frontend origin
      methods: ['GET', 'POST']
    }
  });

  global.io = io;
  
  io.on('connection', (socket) => {
    console.log('✅ Client connected');

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected');
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});