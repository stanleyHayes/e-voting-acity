import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const value = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB on database ${value.connection.db.databaseName}`);
    }catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

export default connectDB;
