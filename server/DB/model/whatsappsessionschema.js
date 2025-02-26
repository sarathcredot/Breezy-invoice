

const mongoose = require("mongoose");


const sessionSchema = new mongoose.Schema({
    title: String,
    sessionData: Object,
  });


 
  
  const Session = mongoose.model("Session", sessionSchema);


  module.exports= Session;

