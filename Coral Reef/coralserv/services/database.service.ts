// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import config from "../config.json";

// Global Variables
export const collections: { login?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
    dotenv.config();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.mongoDB.connectionString);
    await client.connect();
    const db: mongoDB.Db = client.db(config.mongoDB.dbName);
    collections.login = db.collection(config.mongoDB.collections.login);
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collections.login.collectionName}`);
}