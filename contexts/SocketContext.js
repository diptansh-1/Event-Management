'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      path: '/api/socket.io', // Match server path
      autoConnect: true,
      withCredentials: true
    });

    newSocket.on('connect', () => {
      console.log('✅ WebSocket connected');
      setSocket(newSocket);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ WebSocket disconnected');
      setSocket(null);
    });

    newSocket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);