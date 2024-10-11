import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   // const newSocket = io('http://localhost:5000');
  //   const newSocket = io(`${import.meta.env.VITE_SOCKET_URL}`); 
  //   setSocket(newSocket);

  //   return () => newSocket.disconnect();
  // }, []);
  console.log(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    console.log('Attempting to connect to:', import.meta.env.VITE_SOCKET_URL);
    const newSocket = io(`${import.meta.env.VITE_SOCKET_URL}`);
  
    setSocket(newSocket);
  
    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });
  
    newSocket.on('connect_error', (err) => {
      console.error('Connection Error:', err.message);
    });
  
    newSocket.on('error', (err) => {
      console.error('Socket Error:', err);
    });
  
    return () => newSocket.disconnect();
  }, []);
  
  

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
