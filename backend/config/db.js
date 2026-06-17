const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected");

        // Drop legacy unique username index if it exists to clear signup conflicts
        try {
            await mongoose.connection.db.collection("users").dropIndex("username_1");
            console.log("🗑️ Legacy index 'username_1' dropped successfully");
        } catch (indexErr) {
            // Index might not exist or collection is empty, ignore error
        }
    } catch (err) {
        console.error("❌ Database Connection Error");
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;