import bcrypt from 'bcrypt';
import regisModel from "../databaseconnection/registrationSchema.js";


export default class LoginAndRegis{
constructor(){
    this.errors=[]
}
      signup=async(username,email,password,token)=>{
        try{
            const check = await regisModel.findOne({email});
            if(check){ 
                this.errors.push("User already exist")
                return{
                data:null,
                success:false,
                error:this.errors
            }
        }
            const hashPassword = await bcrypt.hash(password,12);
            const user =  new regisModel({username,email,password:hashPassword,token});
            const savedata = await user.save();
         return {
            data:savedata,
            success:true,
            errors:this.errors
         }
        }catch(err){
            this.errors.push(err.message || err); // Add the error message to the errors array
            return {
                data: null,
                success: false,
                errors: this.errors
            };
        }
    }

    logincheck=async(email,password)=>{
        try{
        const check = await regisModel.findOne({email});
        if(check){
           const passcheck = await bcrypt.compare(password,check.password);
           if(passcheck){
            return{
                success:true,
                data:check,
                error:null
            }
           }else{
            this.errors.push('Password is incorrect!');
                return{
                    success:false,
                    error:this.errors
                }
           }
        }else{
            this.errors.push("User not found");
            return{
                success:false,
                error:this.errors
            }
        }
    }catch(err){
        this.errors.push(err)
        return {
            success:false,
            error:this.errors
        }
    }
    }
}