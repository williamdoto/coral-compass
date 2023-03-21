// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { login?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
    dotenv.config();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING ?? "");
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    const loginCollection: mongoDB.Collection = db.collection(process.env.LOGIN_COLLECTION_NAME ?? "");
    collections.login = loginCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${loginCollection.collectionName}`);
}