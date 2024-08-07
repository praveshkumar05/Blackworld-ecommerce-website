import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:{},
        required:true,
    },
    role:{
        type:Number,
        default:0
    },
    otp: { type: String },
    otpExpires: { type: Date },
    verified:{type:Boolean}
},{timestamps:true})
const users=new mongoose.model("users",userSchema);
export default users;
