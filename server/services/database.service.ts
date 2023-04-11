// External Dependencies
import config from "../config.json";
import mongoose from "mongoose";

// Initialize Connection
export async function connectToDatabase() {
    await mongoose.connect(config.mongoDB.connectionString).then(() => {
        console.log(`Successfully connected to MongoDB, database ${mongoose.connections[0].name}`);
    }).catch((error: any) => {
        console.error('Error connecting to MongoDB:', error);
    });
}