import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Mock data (Post list)
let posts = [
  {
    id: 1,
    title: "Paper Clips",
    content:
      "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.",
    likes: 61,
  },
  {
    id: 2,
    title: "Born to Kill",
    content:
      "Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.",
    likes: 46,
  },
];

// Initialize Express app
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utility function for validation
function validatePostInput(post) {
  if (!post.title || typeof post.title !== "string") {
    return "Title is required and must be a string.";
  }
  if (!post.content || typeof post.content !== "string") {
    return "Content is required and must be a string.";
  }
  return null;
}

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all posts
app.get("/posts", (req, res) => {
  return res.json({
    success: true,
    data: posts,
  });
});

// Get post by ID
app.get("/posts/:id", (req, res) => {
  const postId = +req.params.id;
  const foundPost = posts.find((post) => post.id === postId);

  if (!foundPost) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${postId} not found.`,
    });
  }

  return res.json({
    success: true,
    data: foundPost,
  });
});

// Create a new post
app.post("/posts", (req, res) => {
  const validationError = validatePostInput(req.body);

  if (validationError) {
    return res.status(400).json({
      success: false,
      message: validationError,
    });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1, // Generate new ID
    ...req.body,
  };

  posts.push(newPost);

  return res.status(201).json({
    success: true,
    message: "Post has been created.",
    data: newPost,
  });
});

// Update a post by ID
app.put("/posts/:id", (req, res) => {
  const postId = +req.params.id;
  const foundIndex = posts.findIndex((post) => post.id === postId);

  if (foundIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${postId} not found.`,
    });
  }

  const validationError = validatePostInput(req.body);

  if (validationError) {
    return res.status(400).json({
      success: false,
      message: validationError,
    });
  }

  posts[foundIndex] = { id: postId, ...req.body };

  return res.json({
    success: true,
    message: `Post with ID ${postId} has been updated.`,
    data: posts[foundIndex],
  });
});

// Delete a post by ID
app.delete("/posts/:id", (req, res) => {
  const postId = +req.params.id;
  const foundIndex = posts.findIndex((post) => post.id === postId);

  if (foundIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${postId} not found.`,
    });
  }

  posts = posts.filter((post) => post.id !== postId);

  return res.json({
    success: true,
    message: `Post with ID ${postId} has been deleted.`,
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
