const express = require('express')
const bodyParser = require('body-parser');
const jsonParser =bodyParser.json();

const router = express.Router();

const verifyToken = require('../../middlewares/jwtVerifier')


router.get('/',verifyToken('user'), jsonParser, async (req,res)=>{
  
    const title=req.query.title;
    const email=req.decoded.email;
    const db = req.db;
 
    console.log(title);
    console.log(email);
   
   try{ const submissions=db.collection('Submissions')
 
         const query={
           email:email,
           title:title
         }
 
         const projection={
           email:0,
           title:0,
           _id:0
         }
 
        const userSubmissions = await submissions.find(query).project(projection).toArray() ;
        
 
        if(userSubmissions){return res.status(200).json(userSubmissions)
 
       }
        return res.status(404).json({message:'You have not submitted any solution to this problem'});
 
   
   }catch(e){
   return res.status(400).json({message:e});
   }
 
 });

 module.exports = router;