import mongoose from 'mongoose';

const conn = {}

async function connectDb() {
  if (conn.isConnected) {
    // use existing DB connection
    console.log("Using existing connection");
    return;
  }
  //Use new database connection
  try {
    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB Connected');
    conn.isConnected = db.connections[0].readyState;
  }
  catch(err) {
    console.log(err);
  }
}

export default connectDb;