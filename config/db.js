const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDb connected on  ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`Mongodb Sevrer Issue ${error}`)
    }
}
module.exports= connectDB;