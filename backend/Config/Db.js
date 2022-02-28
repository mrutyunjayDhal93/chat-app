//import connect file from mongoose to connect database with server
const { connect } = require("mongoose");

require("dotenv").config();

//getting uri
const mongoURI = process.env.MONGO_CONNECTION_STRING;

//fun for connecting DB -> Server
const connectDatabase = async () => {
  try {
    //try to make connection
    const connection = await connect(`${mongoURI}`);
    console.log("mongodb connected successfully!".magenta.bold);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDatabase;
