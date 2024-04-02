const express = require('express')
const bodyParser = require('body-parser');
const jsonParser =bodyParser.json();
const router = express.Router();

const verifyToken = require('../../middlewares/jwtVerifier')

const {codeExecutionRequestPublisher,codeExecutionResponseConsumer} = require('../../rabbitmq/connections')



let codeExecutionRequestChannel = null;
let codeExecutionResponseChannel = null;
let result

(async function () {if (!codeExecutionResponseChannel) {
  codeExecutionResponseChannel = await codeExecutionResponseConsumer();
  }

codeExecutionResponseChannel.consume('codeExecutionResponseQueue', (msg) => {
    result = JSON.parse(msg.content.toString());
    codeExecutionResponseChannel.ack(msg);
}, { noAck: false});
})();


router.post('/', verifyToken('user'), jsonParser, async (req,res)=>{
       
      const db = req.db;    
      const{title,language,code}=req.body;
      var testcases;
    
          // logic for getting testcases from database
          try{ const cases=db.collection('sampleTestcases')
    
             testcases = await cases.findOne({
              title:title
            },{projection:{
              testcases:1,
              _id:0
            }});
            
    
            if(!testcases){
    
            console.log('Cannot retrieve testcases!')
            
          }
    
      
          }catch(e){
          console.log(e);
          return res.status(500).json({ Error: 'Internal Server Error' });
          }
          
    
    
    
    //logic to send request to rabbitmq queue for code execution
    
    try {
      // Publish the code execution request to the RabbitMQ queue
       
      if(!codeExecutionRequestChannel){

        codeExecutionRequestChannel = await codeExecutionRequestPublisher();
      }
      codeExecutionRequestChannel.sendToQueue('codeExecutionRequestQueue', Buffer.from(JSON.stringify({language, code, testcases })));
    
      console.log('Code execution request published to RabbitMQ.');
     
    
      setTimeout(()=>{ if(result.responseForClient){ console.log(result);
                        return res.status(200).json(result.responseForClient);}
                        else{res.status(200).json({Error:result.errorResponse})}
                     },2000);

      
    
      } catch (error) {
      console.error('Error processing code execution request:', error);
      return res.status(500).json({ Error: 'Internal Server Error' });
    }
    
    
    
    });

    module.exports = router;