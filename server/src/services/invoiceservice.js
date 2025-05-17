
import client from "../../server.js"
import pkg from "whatsapp-web.js"
const { MessageMedia } = pkg




export const invoiceService = {



    generateServiceInvoiceService: (req) => {

        return new Promise(async (resolve, reject) => {

            try {


                const pdfFile = req.file;
                const finalData = JSON.parse(req.body.finalData);
                const phoneNumber = `91${finalData.invoiceData.customer.mob}`;
                const chatId = phoneNumber + "@c.us";

                console.log("📄 Invoice received:", pdfFile.filename);

                const fileUrl = `https://breezy-invoice-api.onrender.com/uploads/${pdfFile.filename}`;


                const secondMessage = `Thank you for choosing Breezy!\n\nAre you satisfied with our service?\n🔵Share your experience with a Google review:\nhttps://g.co/kgs/\u200B6GByT1a\n\n🔵Save our number for future connections!`;

                const media = await MessageMedia.fromUrl(fileUrl, { unsafeMime: true });


                const message = "Breezy Cooling Solution, this is your service invoice! Please check.";

                await client.sendMessage(chatId, message);
                await client.sendMessage(chatId, media);
                await client.sendMessage(chatId, secondMessage);

                console.log("invoice sented !!")


                resolve(fileUrl)

            } catch (error) {

                console.log("invoice sent error", error.message)
                reject()
            }
        })
    }
}