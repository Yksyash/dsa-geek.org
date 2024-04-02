const { MongoClient } = require("mongodb");
const {port,clientUrl,dbName,dbUsername,dbPassword,secretkey,rabbitmqUrl} = require('../config');
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.cjjcdnt.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);


async function attachDB(req, res, next) {
  try {
    // Connect to the MongoDB server
    await client.connect();
    const db = client.db(`${dbName}`);
    req.db = db;
    next();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    next(error);
  }
}

  module.exports = attachDB;