import mongoose from "mongoose";
const connection = {};

async function connect() {
  console.log("ready state: " + mongoose.connection.readyState === 1);

  if (connection.isConnected) {
    console.log("its connected");
    return;
  }
  // if already a connection does exist
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("previously connected");
      return;
    }
    await mongoose.disconnect();
  }
  //new connection
  const options = {
    connectTimeoutMS: 20000,
    family: 4,
  };

  try {
    mongoose.connect(process.env.MONGODB_URI, options, () => {
      console.log("new connection");
      console.log(mongoose.connection.readyState);
      connection.isConnected = mongoose.connections[0].readyState;
    });
  } catch (error) {
    console.log(`error accord in db: ${error}`);
  }
}

const db = { connect };

export default db;
