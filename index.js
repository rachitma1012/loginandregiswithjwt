import path from 'path';
import express from 'express';
import cookieparse from 'cookie-parser';
import expressEjsLayouts from 'express-ejs-layouts';
import jwt from 'jsonwebtoken';
import { Controller } from './src/controller/controller.js';
import connectdb from './src/databaseconnection/db.js';
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieparse());
app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'src','view'));
app.use(express.static(path.join(path.resolve(),'src', 'public')));
app.use(expressEjsLayouts)

const controller = new Controller();
app.get('/',(req,res)=>{
    if(req.cookies.jwt){
        const verify = jwt.verify(req.cookies.jwt,'04yFlS7hUdz2LbVc4INY3ixVjtPdGwKw');
     return res.render('afterlogin',{email:verify.email});
    }
   return res.send("not found!");
})
app.get('/signupPage',controller.signup);
app.post('/signup',controller.processSignup);
app.get('/loginPage',controller.loginPage);
app.post('/logedin',controller.processLogin);
app.listen(7000,()=>{
    console.log("Server is running on port number 7000");
    connectdb();
})