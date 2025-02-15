const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.CONNECTIONSTRING)

client.connect() 
.then(client => {
  console.log("Connected to MongoDB Atlas")
}).catch( err => {
    console.error("Database connection error", err)
})

module.exports = client