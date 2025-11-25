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
app.post('/api/register',(req,res)=>{
    const {email,password,permission} = req.body;
    db.query('insert into users(email,password,permission) values(?,?,?)'[email,password,permission],(err,rows)=>{
        
    })
})
app.listen(port,()=>{
    console.log(`connected to express server ${port}`);
})