/// <reference types="vite/client" />

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export type TurnaroundEvent = {
  flightId: string;
  type: string;
  timestamp: string;
  gate?: string;
};

export const useTurnaroundSocket = () => {
  const [events, setEvents] = useState<TurnaroundEvent[]>([]);

  useEffect(() => {
    const socket = io(import.meta.env.DEV ? "http://localhost:3000" : "http://132.220.176.92:3000");

    socket.on("turnaround", (event: TurnaroundEvent) => {
      setEvents((prev) => [...prev, event]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return events;
};
