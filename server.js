require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();
const db = require('./conn');
const path = require('path');
const port = 8000;
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))


//API FOR LOG IN
app.post('/api/register',async(req,res)=>{
    const {email,password,permission} = req.body;

    if(req.body.email==""||req.body.permission==""){ //check if body is empty
        return res.json({message:`no email or password entered`})
    }
    const saltRound = 10;
    const hashed_password = await bcrypt.hash(password,saltRound);//hashing the password

    db.query('insert into users(email,password,permission) values(?,?,?)',[email,hashed_password,permission],(err,rows)=>{
        if(err){
           res.json({message:`there is error in database ${err}`});
        }else{
        res.json({message:`registered successfully}`})
        }
    })
})
app.listen(port,()=>{
    console.log(`connected to express server ${port}`);
})