const {codeExecutionRequestPublisher,codeExecutionResponseConsumer} = require('../rabbitmq/connections')


let codeExecutionResponseChannel;

(async () => {
  try {
      codeExecutionResponseChannel = await codeExecutionResponseConsumer();
      console.log('Channel opened successfully.');
  } catch (error) {
      console.error('Error opening channel:', error);
      process.exit(1); // Exit the application if channel opening fails
  }
})();

var result;
    
codeExecutionResponseChannel.consume('codeExecutionResponseQueue', (msg) => {

result = JSON.parse(msg.content.toString());
  
codeExecutionResponseChannel.ack(msg);
  
      
},{noAck:false});

module.exports = result ;