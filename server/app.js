



const express = require("express");
const cors = require("cors");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const mongoose = require("mongoose");
const multer = require("multer");
const { MongoStore } = require("wwebjs-mongo");

// MongoDB connection
mongoose.connect("mongodb+srv://sarathsarath93366:sarath1937@cluster0.c3sdg.mongodb.net/breezy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

const sessionStore = new MongoStore({ mongoose: mongoose });

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
app.use("/uploads", express.static("uploads"));

// Initialize WhatsApp Client with MongoDB session storage
const client = new Client({
  authStrategy: new LocalAuth({ clientId: "breezy-bot", dataPath: "./session", store: sessionStore }),
});

client.on("qr", (qr) => {
  console.log("Scan this QR code to connect:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ WhatsApp Bot is ready!");
});

client.on("authenticated", async (session) => {
  console.log("✅ WhatsApp authenticated!");

  // Check if session is being saved
 
});

client.on("message", async (message) => {
  console.log("📩 New message received:", message.body);
});

client.on("disconnected", async (reason) => {
  console.log("🚫 WhatsApp Client Disconnected:", reason);
  console.log("Reconnecting in 5 seconds...");
  setTimeout(() => client.initialize(), 5000);
});

// Start WhatsApp Client
client.initialize();

// API Routes
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Send invoice via WhatsApp
app.post("/invoicesent", upload.single("pdf"), async (req, res) => {
  try {
    const pdfFile = req.file;
    const finalData = JSON.parse(req.body.finalData);
    const phoneNumber = `91${finalData.invoiceData.customer.mob}`;
    const chatId = phoneNumber + "@c.us";

    const fileUrl = `https://breezy-invoice-api.onrender.com/uploads/${pdfFile.filename}`;
    const message = `Hello, this is your service invoice! Please download: ${fileUrl}`;
    const secondMessage = "Thanks for choosing Breezy. Have a nice day!";

    const media = await MessageMedia.fromUrl(fileUrl);
    await client.sendMessage(chatId, media, );
    await client.sendMessage(chatId, secondMessage);

    res.status(200).json({ success: true, message: "Invoice sent!" });
  } catch (error) {
    console.error("❌ Error sending WhatsApp message:", error);
    res.status(500).json({ success: false, message: "Invoice send failed!", error });
  }
});

// Start Server
app.listen(3018, () => {
  console.log("🚀 Server started on port 3018");
});
