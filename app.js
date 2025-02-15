const express = require("express")
const app = express() 
const createItem = require('./api/create-item')
const updateItem = require('./api/update-item')
const deleteItem = require('./api/delete-item')
const index = require('./api/index')
const routerApi = require('./router-api')
const db = require('./db')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

app.use('/api', routerApi)

function passwordProtected(req, res, next) {
 res.set('WWW-Authenticate', 'Basic realm="Simple Todo App"')
if (req.headers.authorization == "Basic bGVhcm46amF2YXNjcmlwdA==") {
  next()
} else  {
  res.status(401).send("Authentication required")
}
}

app.use(passwordProtected)

app.get("/", index.home)

if(!db){
  console.error("Database is not initialized yet!")
  process.exit(1)
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
  })

app.post("/create-item", createItem.create)

app.post('/update-item', updateItem.update)

app.post('/delete-item', deleteItem.delete)

module.exports = app