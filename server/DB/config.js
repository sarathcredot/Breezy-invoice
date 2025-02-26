

const mongoose=require("mongoose")



const connectionFnc=async()=>{

       try {

       await mongoose.connect("mongodb+srv://sarathsarath93366:sarath1937@cluster0.c3sdg.mongodb.net/breezy")
        console.log("DB conncted")
        
       } catch (error) {
        
           console.log("DB connecting failed")
       }
}


module.exports=connectionFnc