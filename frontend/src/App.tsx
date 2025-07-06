import React, { useEffect, useState } from 'react';
import './App.css';
import { TurnaroundEvent, useTurnaroundSubscription } from './hooks/useTurnaroundSubscription';

function App() {
  const [events, setEvents] = useState<TurnaroundEvent[]>([]);
  const newEvent = useTurnaroundSubscription();

  useEffect(() => {
    if (newEvent) {
      setEvents((prev) => [...prev, newEvent]);
    }
  }, [newEvent]);

  return (
    <div className="app-container">
      <div className="header-section">
        <h1 className="app-title">✈️ Simple Turnaround</h1>
        <p className="app-subtitle">Monitor (simulated) real-time aircraft turnaround events</p>
      </div>

      <button
        className="turnaround-button"
        onClick={async () => {
          await fetch(
            (import.meta.env.DEV ? 'http://localhost:3000' : 'https://www.hermanvulkers.com') + '/turnarounds',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                flightId: 'KL123',
                type: 'Refueling',
                timestamp: new Date().toISOString(),
              }),
            },
          );
        }}
      >
        🚀 Send Test Kafka Event
      </button>
      <ul style={{ marginTop: 24 }}>
        {events.map((ev, index) => (
          <li key={index}>
            {ev.flightId} – {ev.type} @{' '}
            {new Date(ev.timestamp).toLocaleTimeString('nl-NL', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
