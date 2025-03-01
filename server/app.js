const express = require("express");
const cors = require("cors");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const mongoose = require("mongoose");
const multer = require("multer");
const { MongoStore } = require("wwebjs-mongo");

// ✅ Connect to MongoDB
mongoose.connect("mongodb+srv://sarathsarath93366:sarath1937@cluster0.c3sdg.mongodb.net/breezy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const sessionStore = new MongoStore({ mongoose: mongoose });

// ✅ Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Multer for File Uploads
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

// ✅ WhatsApp Client Setup with Session Persistence
let client;

async function initializeWhatsApp() {
  client = new Client({
    authStrategy: new LocalAuth({ clientId: "breezy-bot", store: sessionStore }),
  });

  client.on("qr", (qr) => {
    console.log("📌 Scan this QR code to connect:");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("✅ WhatsApp Bot is ready!");
  });

  client.on("authenticated", () => {
    console.log("✅ WhatsApp authenticated!");
  });

  client.on("message", async (message) => {
    console.log("📩 New message received:", message.body);
  });

  client.on("disconnected", async (reason) => {
    console.log("🚫 WhatsApp Disconnected:", reason);
    console.log("🔄 Reconnecting in 5 seconds...");
    setTimeout(initializeWhatsApp, 5000);
  });

  client.initialize();
}

// ✅ Start WhatsApp Client
// initializeWhatsApp();

// ✅ API Routes
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
  console.log("test")
});

// ✅ Send Invoice via WhatsApp
app.post("/invoicesent", upload.single("pdf"), async (req, res) => {
  console.log("req")
  try {
     const pdfFile = req.file;
    const finalData = JSON.parse(req.body.finalData);
    const phoneNumber = `91${finalData.invoiceData.customer.mob}`;
    const chatId = phoneNumber + "@c.us";

    console.log("📄 Invoice received:", pdfFile.filename);

    const fileUrl = `https://breezy-invoice-api.onrender.com/uploads/${pdfFile.filename}`;
    const secondMessage = "🙏 Thanks for choosing Breezy. Have a nice day!";

    const media = await MessageMedia.fromUrl(fileUrl, { unsafeMime: true });

    
    const message = "📄 Hello, this is your service invoice! Please check the attached file.";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}&media=${encodeURIComponent(fileUrl)}`;
    res.status(200).json({
      success: true,
      message: "Invoice sent!",
      fileUrl: fileUrl,
      whatsappLink: whatsappLink
      
    });
  } catch (error) {
    console.error("❌ Error sending WhatsApp message:", error);
    res.status(500).json({ success: false, message: "❌ Invoice send failed!", error });
  }
});

// ✅ Auto-reconnect & Keep Alive every 10 minutes
// setInterval(async () => {
//   console.log("🔄 Checking WhatsApp connection...");
//   if (!client || !client.info) {
//     console.log("❌ WhatsApp client is disconnected. Restarting...");
//     initializeWhatsApp();
//   } else {
//     console.log("✅ WhatsApp client is active.");
//   }
// }, 600000); // Every 10 minutes

// console.log("server")

// ✅ Start Server
app.listen(3002, () => {
  console.log("🚀 Server started on port 3018");
});
