import mongoose from "mongoose";

const connectDB=async()=>{
  mongoose.connection.on('connected',()=>{
    console.log("Connection extablished");
  })
  await mongoose.connect(`${process.env.MONGODB_URI}/EchoTunes`);
}

export default connectDB;