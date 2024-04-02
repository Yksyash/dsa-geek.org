// const dotenv = require('dotenv');
// dotenv.config();
module.exports = {
  port: process.env.PORT,
  clientUrl: process.env.CLIENT_URL,
  dbName:process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  secretKey: process.env.SECRET_KEY,
  rabbitmqUrl:process.env.RABBITMQ_URL
};