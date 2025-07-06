import React, { useEffect, useState } from 'react';
import './App.css';
import { TurnaroundEvent, useTurnaroundSubscription } from './hooks/useTurnaroundSubscription';

function App() {
  const [events, setEvents] = useState<TurnaroundEvent[]>([]);
  const newEvent = useTurnaroundSubscription();

  useEffect(() => {
    if (newEvent) {
      console.log('✅ New event in frontend:', newEvent);

      setEvents((prev) => [...prev, newEvent]);
    }
  }, [newEvent]);

  return (
    <div className="app-container">
      <div className="header-section">
        <h1 className="app-title">✈️ Simple Turnaround</h1>
        <p className="app-subtitle">Monitor real-time aircraft turnaround events</p>
      </div>

      <button
        className="turnaround-button"
        onClick={async () => {
          await fetch((import.meta.env.DEV ? 'http://localhost:3000' : 'http://132.220.176.92:3000') + '/turnarounds', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              flightId: 'KL123',
              type: 'Refueling',
              timestamp: new Date().toISOString(),
            }),
          });
        }}
      >
        🚀 Send Test Kafka Event
      </button>
      <ul style={{ marginTop: 24 }}>
        {events.map((ev, index) => (
          <li key={index}>
            {ev.flightId} – {ev.type} @ {new Date(ev.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
