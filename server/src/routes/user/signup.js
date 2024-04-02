const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jsonParser =bodyParser.json();

const router = express.Router();


router.post('/', jsonParser,async (req, res) =>{

  const{username,email,password}=req.body;
  const db = req.db;

  if(username=='' || email=='' || password=='' ){
    return res.status(400).json({message:'username, email and password cannot be empty!'})
  }
  
  if(!email.includes('@')){
    return res.status(400).json({message:'Incorrect Email Format'})
  }
  
  const usersCollection = db.collection("signedupUsers");

  const usernameInUse = await usersCollection.findOne({username});
  const emailInUse = await usersCollection.findOne({email});
 
  if(usernameInUse){return res.status(400).json({message:'This username is not available!'})}

  if(emailInUse){return res.status(400).json({message:'Email is already registered!'})}

  const hashedPassword = await bcrypt.hash(password, 10);

  await usersCollection.insertOne({
    username,
    email,
    password: hashedPassword,
  });
  
  return res.status(201).json({ message: 'User registered successfully' });
});

module.exports = router;