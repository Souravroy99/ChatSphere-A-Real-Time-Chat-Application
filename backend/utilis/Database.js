const mongoose = require('mongoose');
const URI = process.env.MONGOOSE_URL;

const connectDB = async() => {
    try{
        await mongoose.connect(URI);
        console.log(`Successfully Connected to Database`);
    }
    catch(error){
        console.log(`Connection Failed in Database : ${error}`);
        process.exit(0) ;
    }
}

module.exports = connectDB;