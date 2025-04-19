// Added improved error handling for MongoDB connection and graceful shutdown

const express = require("express");
const path = require("path");
const morgan = require("morgan"); // Importing the middleware
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB with options and error handling
const mongoURI = "mongodb://localhost:27017/smartcompare"; // Change the URI as needed
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

// Use morgan middleware to log requests
app.use(morgan("dev"));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Define Mongoose schema and model for products
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: String, default: "" },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  imageUrl: { type: String, default: "" },
});

const Product = mongoose.model("Product", productSchema);

// API route to get products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API route to get products by category
app.get("/api/products/:category", async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") },
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to check MongoDB connection status
app.get("/check-mongo", (req, res) => {
  const state = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  let statusMessage = "";
  switch (state) {
    case 0:
      statusMessage = "disconnected";
      break;
    case 1:
      statusMessage = "connected";
      break;
    case 2:
      statusMessage = "connecting";
      break;
    case 3:
      statusMessage = "disconnecting";
      break;
    default:
      statusMessage = "unknown";
  }
  res.json({ mongoConnectionStatus: statusMessage });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error during MongoDB connection close:", error);
    process.exit(1);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
