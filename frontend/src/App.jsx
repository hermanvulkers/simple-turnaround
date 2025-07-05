import './App.css';

function App() {
  
  const baseUrl = "http://localhost:3000";

  return (
    <div className="app-container">
      <div className="header-section">
        <h1 className="app-title">
          ✈️ Schiphol Turnaround
        </h1>
        <p className="app-subtitle">
          Monitor real-time aircraft turnaround events
        </p>
      </div>
      
      <button
        className="turnaround-button"
        onClick={async () => {
          await fetch(`${baseUrl}/turnarounds`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Test turnaround" }),
          });
        }}
      >
        🚀 Send Test Kafka Event
      </button>
    </div>
  );
}

export default App;
