import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:3001/posts");
      const data = await res.json();
      setPosts(data);
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
