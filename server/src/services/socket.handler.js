import { Server } from 'socket.io';
import { registerSocketEvents } from './game/EventRegistry.js';

export const initSocketServer = (server, clientOrigin) => {
  const io = new Server(server, {
    cors: {
      origin: (origin, callback) => callback(null, true),
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  // Bind to registerSocketEvents module
  registerSocketEvents(io);
};

export default initSocketServer;
