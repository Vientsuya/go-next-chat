'use client';
import {createContext, useState} from 'react';

type Connection = WebSocket | null;

export const WebsocketContext = createContext<{
  connection: Connection;
  setConnection: (c: Connection) => void;
}>({
  connection: null,
  setConnection: () => {},
});

export default function WebsocketProvider({children}: {children: React.ReactNode}) {
  const [connection, setConnection] = useState<Connection>(null);

  return (
    <WebsocketContext.Provider
      value={{
        connection: connection,
        setConnection: setConnection,
      }}>
      {children}
    </WebsocketContext.Provider>
  );
}
