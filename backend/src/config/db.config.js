import mongoose from 'mongoose';

export const connectDB = async () => {
try {
        const conn = await mongoose.connect(process.env.MONGO_DB);

        console.log(`\n✅ MongoDB Connected!`);
        console.log(`-----------------------------------`);
        console.log(`📂 Database Name:   "${conn.connection.name}"`);
        console.log(`🖥️  Host / Cluster:  ${conn.connection.host}`);
        console.log(`-----------------------------------\n`);
    }
    // MongoDB will give an error if it takes longer than 30 seconds. If it crashes though, Netlify will ensure the server restarts and tries again.
    catch (error) {
        console.error(`Failed to connect to MongoDB! Error: ${error.message}`);
        process.exit(1);
    }
}