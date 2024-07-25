import jwt from 'jsonwebtoken';
import LoginAndRegis from "../model/LoginandRegis.Model.js";


export class Controller{
    constructor(){
        this.model = new LoginAndRegis();
    }
    fortesting=(req,res)=>{
        return res.send("Just for checking from controller!")
    }
    signup(req,res){
        return res.render('signup.ejs',{errors:[]})
    }
   processSignup=async(req, res)=> {
        const { username, password, email ,confirmPassword} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        const errors = [];
        if(!username||username.trim()==''){
            errors.push("Username is required!")
        }
        if(!email){
            errors.push("Email is required!");
            if(!emailRegex.test(email)) errors.push("Invalid email format. Please enter a valid email address")
        }
    if(!password){
        errors.push("Password is required");
    }
    if(!passwordRegex.test(password)) errors.push('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.');
    if(!confirmPassword) errors.push("Confirm Password is required");    
    if(confirmPassword!==password)errors.push("Confirm password not match with the actual password!")
    

if(errors.length>0){
   return res.render('signup.ejs',{errors});
}
        const token = jwt.sign({email},'04yFlS7hUdz2LbVc4INY3ixVjtPdGwKw')
        const senddata =  await this.model.signup(username,email,password,token);
        console.log(senddata);
        res.cookie("jwt",token,{
            maxage:600000,
            httpOnly:true
        })
       return res.render("aftersignup.ejs");
    }

loginPage=(req,res)=>{
    return res.render('login.ejs',{errors:[]})
}
processLogin= async(req, res) =>{
    const {  password, email } = req.body;
    const result = await this.model.logincheck(email,password);
    if(result.success){
        res.cookie('jwt',result.data.token,{
            maxage:600000,
            httpOnly:true
        })
      return res.redirect("/");
    }
    const errors = result.error;
    res.render('login.ejs',{errors:errors})
   
}
}