import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB);
        console.log(`Connected to MongoDB | Host: ${conn.connection.host} | DB: ${conn.connection.name}`);
    }
    // MongoDB will give an error if it takes longer than 30 seconds. If it crashes though, Netlify will ensure the server restarts and tries again.
    catch (error) {
        console.log("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}