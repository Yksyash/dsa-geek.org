
const express = require('express')
const bodyParser = require('body-parser');

const urlencodedParser =bodyParser.json();

const router = express.Router();
router.get('/',urlencodedParser, async (req,res) =>{
   
      const db = req.db;
      

    if(req.query.title){
      const title=req.query.title;
      try{
      
      const collection = db.collection('questions');
      const questionDetails=await collection.findOne({title:title},{ projection:{
        _id:0,
        title:0,
        acceptance:0,
        difficulty:0,
      }});
      
      return res.status(200).json(questionDetails);

    }catch(e){
      return res.status(400).json({message:e});
    }
  }
  
   else{ try{
      const projection={
        _id:0,
        description:0,
        testcases:0,
        functions:0
      }
      const collection = db.collection('questions');
      const questions =await collection.find().project(projection).toArray();
        return res.status(200).json(questions);
       }catch(e){
         return res.status(400).json({message:e})
       }
      }
   

});

module.exports = router;