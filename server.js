const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const signup=require('./controllers/signup');
const login=require('./controllers/login');
const image=require('./controllers/image');
const profile=require('./controllers/profile');
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'facerecognitionapp'
  }
})
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{res.send('It is working')})
app.post('/login',(req,res)=>login.handleLogin(req,res,db,bcrypt))
app.post('/signup',(req,res)=>signup.handleSignup(req,res,db,bcrypt))
app.get('/viewprofile/:name',(req,res)=>profile.handleProfile(req,res,db))
app.put('/image',(req,res)=>image.handleImage(req,res,db))
app.post('/imageurl',(req,res)=>image.handleApiCall(req,res))
app.listen(process.env.PORT || 3000 ,()=>{
	console.log(`App is running on ${process.env.PORT}`);
})