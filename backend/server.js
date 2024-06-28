import express from "express";
import dotenv from "dotenv";
import http from "http";
import { products } from "./routes/productsRoute.js";
import { user } from "./routes/usersRoute.js";
import { cart } from "./routes/cartRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import cookie from "cookie";
import { getCartCount, getCartItems } from "./controllers/cartController.js";
import { getSearchQuery } from "./controllers/searchController.js";

import Connection from "./config/mongooseConnection.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173", // Allow frontend domain
  methods: ["GET", "POST"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow sending cookies from frontend
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Server working");
});

app.use("/amazon/products", products);
app.use("/amazon/user", user);
app.use("/amazon/cart", cart);

io.use((socket, next) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  socket.cookies = cookies;
  next();
});

io.on("connection", async (socket) => {
  console.log("Client connected", socket.id);

  // Emit initial cart count when a client connects
  const token = socket.cookies.accessToken;
  const initialCartCount = await getCartCount(token);
  socket.emit("cartCountUpdate", {
    type: "cartCountUpdate",
    count: initialCartCount,
  });

  const cartItems = await getCartItems(token);
  socket.emit("cartItemsUpdate", {
    type: "cartItemsUpdate",
    items: cartItems,
  });

  socket.on("getCartItems", async () => {
    const token = socket.cookies.accessToken;
    const cartItems = await getCartItems(token);
    socket.emit("cartItemsUpdate", {
      type: "cartItemsUpdate",
      items: cartItems,
    });
  });

  // Listen for "updateCartCount" from the client
  socket.on("updateCartCount", async () => {
    console.log("Received updateCartCount event");
    const token = socket.cookies.accessToken;
    const updatedCartCount = await getCartCount(token);
    socket.emit("cartCountUpdate", {
      type: "cartCountUpdate",
      count: updatedCartCount,
    });
  });

  socket.on("searchProducts", async (query) => {
    console.log("Received searchProducts event");
    const searchQuery = query.trim().toLowerCase();
    const products = await getSearchQuery(searchQuery);
    console.log("founded products: " + products);
    if (products.length > 0) {
      console.log("Sending search results to client");
      socket.emit("searchResults", {
        type: "searchResults",
        results: products,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
