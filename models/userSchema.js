const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type : String,
        required : true
    }
})
// Model
const userModel = new mongoose.model("userData" , userSchema);
module.exports = userModel