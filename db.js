const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.CONNECTIONSTRING)

client.connect() 
.then(client => {
  console.log("Connected to MongoDB Atlas")

  module.exports = client

  const app = require('./app')

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}).catch( err => {
    console.error("Database connection error", err)
})