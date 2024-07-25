import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1:27017/Registration';
const connectdb = ()=>{
   mongoose.connect(url)
   .then(()=>console.log("Db is connected"))
   .catch((err)=>console.log(err))
   
}
export default connectdb;
