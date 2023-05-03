// External Dependencies
import config from "../config.json";
import mongoose from "mongoose";
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Initialize Connection
export async function connectToDatabase() {
    await mongoose.connect(config.mongoDB.connectionString).then(() => {
        console.log(`Successfully connected to MongoDB, database ${mongoose.connections[0].name}`);
    }).catch((error: any) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

export function importFunction(data: string){
    MongoClient.connect(config.mongoDB.connectionString, {useNewUrlParser: true}, function (err: any, client: any) {
        if (err) {
            console.log('Err  ', err);
        } else {
            console.log("Connected successfully to server");
            client.db.insertMany(eval(data));
        }
    });
}