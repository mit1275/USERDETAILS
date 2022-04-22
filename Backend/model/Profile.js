

const mongoose = require("mongoose"); 

const profileSchema = new mongoose.Schema({ 
    
   adress:{type:String,required:true},
state:{type:String,required:true},
city:{type:String,required:true},
pincode:{type:String,required:true},
country:{type:String,required:true},
companyname:{type:String},
occupation:{type:String},
experience:{type:Number},

});

   

module.exports = mongoose.model("Profile", profileSchema);


