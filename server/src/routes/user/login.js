const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jsonParser =bodyParser.json();

const router = express.Router();

const {port,clientUrl,dbName,dbUsername,dbPassword,secretKey,rabbitmqUrl} = require('../../config');




router.post('/', jsonParser, async ( req,res)=>{

  const{email,password} = req.body;
  const db = req.db;

  if(email=='' || password=='' ){
    return res.status(400).json({message:'email and password cannot be empty!'})
  }

  const usersCollection = db.collection("signedupUsers");

  const user = await usersCollection.findOne({email});

  if(user){

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch){

    const token = jwt.sign({userName: user.username, email:user.email, role:'user'}, secretKey)
    return res.status(200).json({token});
    }
  
    else{
      return res.status(400).json({message:'Incorrect Password!'})
    }
    }else{
    return  res.status(401).json({message:'This email address is not registered with us!'});
}

});

module.exports = router;