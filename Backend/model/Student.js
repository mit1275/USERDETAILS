const mongoose = require("mongoose"); 
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true}, 
    contactNo: { type: String, required: true},
    adress:{type:String,default:''},
    state:{type:String,default:''},
    city:{type:String,default:''},
    pincode:{type:String,default:''},
    country:{type:String,default:''},
    companyname:{type:String,default:''},
    occupation:{type:String,default:''},
    experience:{type:Number,default:0},
    projects:[{
        name:{
            type:String
        },
        description:{
            type:String
        },
        category:{
            type:String
        },
        startdate:{
            type:String
        },
        enddate:{
            type:String
        }
        
    }
    ]

});

    // GENERATING TOKEN

module.exports = mongoose.model("Student", studentSchema);