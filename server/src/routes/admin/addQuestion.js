const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const jsonParser =bodyParser.json();

const router = express.Router();

const verifyToken = require('../../middlewares/jwtVerifier')

router.post('/',verifyToken('admin'),jsonParser,async (req,res)=>{

  const {title,description,testcases} = req.body;
  const db = req.db;
  
  if(title=='' || description=='' || testcases=='' )
   {
    return res.status(400).json({message:'Incorrect Format Or Missing Data'})
  }

  try{
   const questionsList = db.collection('questions')
   questionsList.insertOne({
   title,
   description,
   testcases
  })
   return res.status(200).json({message:'Question Added'});
  }catch(e){
    res.status(400).json({message:e})
  }
  
});

module.exports = router;
