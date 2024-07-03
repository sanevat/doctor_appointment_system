const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
//dotenv config
dotenv.config();
// rest object
const app = express();
// middlewares
app.use(express.json());
app.use(morgan('dev'));
//mongoDB connection
connectDB();
//routes
app.use('/api/v1/user', require('./routes/userRoutes.js'));
app.use('/api/v1/admin', require("./routes/adminRoutes.js"));
app.use('/api/v1/doctor', require("./routes/doctorRoutes.js"));
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`)
});