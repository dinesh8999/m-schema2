const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, minlength: 5 },
  content: { type: String, required: true, minlength: 50 },
  author: { type: String, required: true },
  tags: { type: [String] },
  category: { type: String, default: "General" },
  createdAt: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model("BlogPost", blogSchema);
module.exports = BlogPost;