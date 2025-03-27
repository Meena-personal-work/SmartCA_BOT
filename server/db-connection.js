// DB connection
const mongoose = require ('mongoose');
require ('dotenv').config ();

const conn = mongoose.connection;

const dbConnection = () => {
  return new Promise ((resolve, reject) => {
    // mongoose.set ('strictQuery', false);
    mongoose
      .connect (`${process.env.DB_CONNECTION_STRING}`)
      .then (() => {
        resolve ('DB connected');
      })
      .catch ((err) => {
        reject (err);
      });
  });
};

module.exports = {
  dbConnection,
  conn
};