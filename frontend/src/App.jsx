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
      <h1>Microblog</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>: {p.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
