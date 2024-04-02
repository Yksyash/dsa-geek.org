const amqp = require('amqplib');

const {port,clientUrl,dbName,dbUsername,dbPassword,secretKey,rabbitmqUrl} = require('../config');

async function codeExecutionRequestPublisher () {
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
  
  async function codeExecutionResponseConsumer() {
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

  module.exports = {codeExecutionRequestPublisher,codeExecutionResponseConsumer};