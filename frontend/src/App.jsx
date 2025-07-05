import './App.css';

function App() {
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
         await fetch((import.meta.env.DEV ? "http://localhost:3000" : "http://172.201.33.227:3000") + "/turnarounds", {
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
