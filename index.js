const express = require("express");
const mongoose = require("mongoose");
const { resolve } = require("path");
const BlogPost = require("./schema"); // Import schema
const cors = require("cors"); // Allow cross-origin requests

const app = express();
const port = 3010;

// Middleware
app.use(express.json()); // To handle JSON data
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/blogDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Serve static files
app.use(express.static("static"));

// Serve HTML page
app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

// ✅ API to Create a Blog Post
app.post("/posts", async (req, res) => {  // Changed route to /posts
  try {
    console.log("Received request:", req.body); // Debugging
    const newPost = new BlogPost(req.body);
    await newPost.save();
    res.status(201).json({ message: "✅ Blog post created!", post: newPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ API to Get All Blog Posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch blog posts" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
