import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const baseUrl = import.meta.env.DEV ? "http://localhost:3000" : import.meta.env.VITE_API_URL;

      try {
        const res = await fetch(`${baseUrl}/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div>
      <button
        onClick={async () => {
          const baseUrl = import.meta.env.DEV ? "http://localhost:3000" : import.meta.env.VITE_API_URL;
          await fetch(`${baseUrl}/turnarounds`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Test turnaround" }),
          });
        }}
      >
        Send Test Kafka Event
      </button>
    </div>
  );
}

export default App;
