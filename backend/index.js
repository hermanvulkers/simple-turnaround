const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const posts = [{ id: 1, title: "Hello Kubernetes", content: "This is your first post!" }];

app.get("/posts", (req, res) => {
  res.json(posts);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
