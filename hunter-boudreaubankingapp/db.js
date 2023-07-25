const { MongoClient } = require('mongodb');

// Use environment variables for the MongoDB connection
const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const host = 'atlas-cppx99-shard-00-00.imovtwf.mongodb.net:27017'; // Replace with your actual MongoDB host
const port = '27017'; // Replace with your actual MongoDB port
const database = 'bad-bank'; // Replace with your actual MongoDB database name

const uri = `mongodb://${username}:${password}@${host}:${port}/${database}`;

// Create a MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(database);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code
  }
}

module.exports = { connectToDatabase };
