// External Dependencies
import * as mongoDB from "mongodb";
import config from "../config.json";
const mongoose = require("mongoose/");



// Global Variables
export const collections: { login?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
    const mongoose = require("mongoose/");
    // const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.mongoDB.connectionString);
    // await client.connect();
    await mongoose.connect(config.mongoDB.connectionString).then(() => {
        console.log('Successfully connected to MongoDB');
      })
      .catch((error:any) => {
        console.error('Error connecting to MongoDB:', error);
      });
    // const db: mongoDB.Db = client.db(config.mongoDB.dbName);
    // collections.login = db.collection(config.mongoDB.collections.login);
    // console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collections.login.collectionName}`);
}