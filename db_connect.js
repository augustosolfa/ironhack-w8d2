import mongoose from "mongoose";

mongoose.set('strictQuery', false);

async function connect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Db: ${dbConnection.connection.name}`);
  } catch (error) {
    console.log(error);
  }
}

export default connect;