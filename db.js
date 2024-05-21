import mongoose, { connect, connection } from 'mongoose';

const uri = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB URI

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB is connected');
  }).catch(err => {
    console.error('MongoDB connection unsuccessful, retry after 5 seconds.', err);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

connection.on('connected', () => {
  console.log('Mongoose connected to DB Cluster');
});

connection.on('error', (error) => {
  console.error('Mongoose connection error:', error);
});

connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

export default mongoose;
