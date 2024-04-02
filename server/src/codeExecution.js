const amqp = require('amqplib');
const fs = require('fs')
const{exec}=require('child_process')

const{rabbitmqUrl}= require ('./config');

async function addResToQueue(){ 

const codeExecutionRequestConsumer = async() => {
  try {
    const connection = await amqp.connect(`${rabbitmqUrl}`);
    const channel = await connection.createChannel();
    
    // Create a RabbitMQ queue
    const queueName = 'codeExecutionRequestQueue';
    await channel.assertQueue(queueName, { durable: false });
    
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};

const codeExecutionResponsePublisher = async () => {
  try {
    const connection = await amqp.connect(`${rabbitmqUrl}`);
    const channel = await connection.createChannel();
    
    // Create a RabbitMQ queue
    const queueName = 'codeExecutionResponseQueue';
    await channel.assertQueue(queueName, { durable: false });
    
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};

const codeExecutionRequestChannel = await codeExecutionRequestConsumer();
const codeExecutionResponseChannel = await codeExecutionResponsePublisher();



var responseForClient=null;
var errorResponse=null;

 
  try{ 
    
    codeExecutionRequestChannel.consume('codeExecutionRequestQueue', (msg) => {

    console.log('initiating code execution in docker containers!')
  
    const {language, code, testcases } = JSON.parse(msg.content.toString());
  
  //logic to run a container
        var imageName;
        var finalCode;
        var tests;
        switch(language){
          case 'javascript':
            imageName='leetcode-node-vanilla-app';
            tests=testcases.testcases.javascript;
            finalCode=`${code}\n\n${tests}`;
            fs.writeFileSync('run-dsa.js',finalCode);
            break;
          case 'python':
            imageName='leetcode-python-app';
            tests=testcases.testcases.python;
            finalCode=`${code}\n\n${tests}`
            fs.writeFileSync('app.py', finalCode);
            break;  
          case 'cpp':
            imageName='leetcode-cpp-vanilla-app';
            tests=testcases.testcases.cpp;
            finalCode=`#include<iostream>\n\nusing namespace std;\n\n${code}\n\n${tests}`
          fs.writeFileSync('my-app.cpp',finalCode)
          break;
          case 'java':
            imageName='leetcode-java-vanilla-app';
            tests=testcases.testcases.java;
            fs.writeFileSync('Solution.java',code)
            fs.writeFileSync('TestResults.java',tests)
            break;
        }
  
          // Build and run Docker container with --rm option
          const command =`sudo docker run --rm -v "$(pwd)":/usr/src/app ${imageName}`;
          exec(command, async (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing Docker container: ${error, stderr}`);
              errorResponse= stderr;
            } else {
              const dockerOutput=stdout.toString().trim();
              if(language=='java' || language=='cpp'){
                
              const pairs = dockerOutput.split("\n");
  
              const result = pairs.map(pair => {
                  const [expectedKey, expectedValue] = pair.split(", ")[0].split(": ");
                  const [actualKey, actualValue] = pair.split(", ")[1].split(": ");
          
                  return {
                      Expected: parseInt(expectedValue.trim()),
                      Actual: parseInt(actualValue.trim())
                  };
              });
              responseForClient=result;

            }
              else if(language=='javascript'){
              // console.log(`DSA code output: ${JSON.stringify(output)}`);
              const validJsonString = dockerOutput.replace(/([a-zA-Z0-9]+):/g, '"$1":') && dockerOutput.replace(/([a-zA-Z]+)/g, '"$1"');
              responseForClient=JSON.parse(validJsonString);
              }
            else{ 
              const validJsonString = dockerOutput.replace(/'([^']+?)'/g, '"$1"').replace(/(\bNone\b)/g, '"None"');
              responseForClient=JSON.parse(validJsonString);
            }  
            
          }

          
          
          if(responseForClient){

          codeExecutionResponseChannel.sendToQueue('codeExecutionResponseQueue', Buffer.from(JSON.stringify({responseForClient})));

          responseForClient=null;

          }

          else{

          codeExecutionResponseChannel.sendToQueue('codeExecutionResponseQueue', Buffer.from(JSON.stringify({errorResponse})));

          errorResponse=null;

          }

          
          console.log('Code execution result published to RabbitMQ.');
          
          
          
          
        });
        
        
        codeExecutionRequestChannel.ack(msg);
        

        },{noAck:false});



    }catch(error){
      console.error('Error processing code execution request:', error);
      return res.status(400).json({message:error});
      
    }
  
  
}
  addResToQueue();

