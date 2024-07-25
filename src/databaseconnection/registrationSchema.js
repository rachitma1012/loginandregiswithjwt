import mongoose from "mongoose";

const regisSchema = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,unique:true},
    password:{type:String,required:true},
    token:{type:String,required:true},
},{ timestamps: true })

const regisModel = mongoose.model('user',regisSchema);
export default regisModel;

