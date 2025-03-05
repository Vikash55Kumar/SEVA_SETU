import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { Employee } from "../models/employee.model.js"; // Correct path to your Employee model

const updateProviderIds = async () => {
    await Employee.updateMany(
        { providerId: null },
        { $unset: { providerId: "" } }
    );
};

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected !! DB Hosted on : ${connectionInstance.connection.host}`);

        await updateProviderIds();

        try {
            await Employee.collection.dropIndex('providerId_1');
        } catch (indexError) {
        }

        // Ensure the index is sparse
        await Employee.collection.createIndex({ providerId: 1 }, { unique: true, sparse: true });

    } catch (error) {
        console.log("MONGODB connection error: ", error.stack);
        process.exit(1);
    }
};

export default connectDB;
