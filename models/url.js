const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
    {
    shortID:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type:Number}}], //Timestamp is not a keyword
 },

 {timestamps:true}
 
);

const URL = mongoose.model("url",urlSchema);

module.exports = URL; //URL is given here as the exported name but in index I have used the same name "URL" to import it but I could have used a different name and it would not cost any problem

