const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const jsonParser =bodyParser.json();

const router = express.Router();

const {port,clientUrl,dbName,dbUsername,dbPassword,secretKey,rabbitmqUrl} = require('../../config');

router.post('/',jsonParser, async (req, res) => {
    const { email, password } = req.body;
   
    if(email=='' || password=='' ){
      return res.status(400).json({message:'email and password cannot be empty!'})
    }
  
    if ( email === 'adminEmail' && password==='adminPassword') {
      // Credentials are valid, create a JWT token
      const token = jwt.sign({ email: 'adminEmail', role: 'admin' }, secretKey);
  
      return res.status(200).json({ token });
    } else {
       return res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  module.exports = router;
  