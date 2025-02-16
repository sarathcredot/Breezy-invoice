


const express=require("express")
const app=express()
const cors=require("cors")
const { Client, LocalAuth ,MessageMedia} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const multer = require("multer");

// Create a new client instance
const client = new Client({
    authStrategy: new LocalAuth() // Saves session, so you don't have to scan QR every time
});

app.use(cors("*"))
app.use(express.json());

app.use(express.urlencoded({extended:true}))


client.on('qr', qr => {
    console.log('Scan this QR code to connect:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Bot is ready!');
});



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Store in 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });
  
  const upload = multer({ storage });


  app.use('/uploads', express.static('uploads'));




app.post("/invoicesent",upload.single("pdf"),async(req,res)=>{

  
  try {

    const pdfFile = req.file
    console.log("Received PDF:", pdfFile.filename);

    const finalData = JSON.parse(req.body.finalData)
    console.log("mob",finalData.invoiceData.customer.mob)
      
    const fileUrl = `https://breezy-invoice-api.onrender.com/uploads/${pdfFile.filename}`;

    const phoneNumber = `91${finalData.invoiceData.customer.mob}`; // Replace with the recipient's number
       const chatId = phoneNumber + '@c.us'; // WhatsApp chat ID format
       const message = `Hello, this is your service invoice! please download ${fileUrl} `;

       const secondMessage="Thanks for choosing Breezy. Have a nice day!"
      //  await client.sendMessage(chatId, message);

      const media = await MessageMedia.fromUrl(fileUrl);

      // Send media file to WhatsApp
      await client.sendMessage(chatId, media, { caption: message });

      await client.sendMessage(chatId, secondMessage);

       res.status(200).json({ success: true, message: "Invoice sent!" });
    
  } catch (error) {

    console.log("err",error)
    
    res.status(500).json({ success: false, message: "Invoice sent failed!",error });
  }



})



 


app.listen(3018,()=>{

    
   client.initialize()
     console.log("server started")
})
