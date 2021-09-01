import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  await mongoose.connect(process.env.DATABASE_DATA_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  return handler(req, res);
};

export default connectDB;
