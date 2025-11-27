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

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','login.html'))
})
//API FOR register
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

//API FOR LOG IN
app.post('/api/login',(req,res)=>{
    const {email,password} = req.body;
    if(email==null||password==null){
        return res.json({message:'please enter email and password'})
    }
    db.query('select * from users where email=?',[email],async(err,rows)=>{
        if (err) {
              return res.json({message:'there is error on database' + err})
        }
        if (rows.length == 0) {
            return res.json({message:'the email or username does not exist'})
        }

        const user = rows[0];
        const match = await bcrypt.compare(password,user.password);
        if (!match) {
             return res.json({message:'incorrect password'})
        }
        const token = jwt.sign({email:user.email,password:user.password},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        res.json({
            next_page:'dashboard.html',
            message:"<span style='color:green'>login sucessfully</span>",
            token:token
        })

    })

})
//api to verify and authorize user to next page
app.post('/api/verify',(req,res)=>{
    const token = req.headers['authorization'].split(' ')[1];

    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if (err) return res.json({message:'token is invalid or expired'})
          res.json({
            next_page:'https://todo-list-app-ljof.onrender.com/',
        })    
    })
})

app.listen(port,()=>{
    console.log(`connected to express server ${port}`);

})
