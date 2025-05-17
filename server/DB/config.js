

const mongoose=require("mongoose")
require('dotenv').config()



const connectionFnc=async()=>{

       try {

       await mongoose.connect(process.env.MONGO_URI)
       
       console.log("DB conncted")
        
       } catch (error) {
        
           console.log("DB connecting failed",error)
       }
}


module.exports=connectionFnc