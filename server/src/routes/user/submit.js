const express = require('express')
const bodyParser = require('body-parser');
const jsonParser =bodyParser.json();

const router = express.Router();


const verifyToken = require('../../middlewares/jwtVerifier')

router.post('/', verifyToken('user'), jsonParser, async (req, res) => {
    const email=req.decoded.email;
    const db = req.db;
    const {title,code} = req.body;
  
    try{const submissions= db.collection('Submissions')
  
    await submissions.insertOne({
      email:email,
      title:title,
      code:code
    })
  
    return res.status(200).json({message:'Solution Submitted'});
  }catch(e){
   return res.status(400).json({message:e});
  }
  
  });

  module.exports = router;