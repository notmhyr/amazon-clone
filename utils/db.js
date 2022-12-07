import mongoose from "mongoose";

async function connect() {
  console.log(mongoose.connection.readyState === 1);
  console.log(mongoose.connection.readyState);

  if (mongoose.connection.readyState === 2) {
    mongoose.connection.readyState = 0;
  }
  if (mongoose.connection.readyState === 1) {
    console.log("it's already connected");
    return;
  }
  if (mongoose.connection.readyState === 0) {
    try {
      console.log("connecting to db...");
      const db = mongoose.connect(process.env.MONGODB_URI);
      console.log("connected to mongodb: " + mongoose.connection.readyState);
    } catch (error) {
      console.log(error);
    }
  }
}

async function disconnect() {
  if (mongoose.connection.readyState === 1) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected(false);
    } else {
      console.log("not disconnected");
    }
  }
}
const db = { connect, disconnect };

export default db;
