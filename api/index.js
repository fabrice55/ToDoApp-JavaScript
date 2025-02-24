const db = require('../db')
const {ObjectId} = require('mongodb')



exports.apiViewListOfItems = async function(req, res) {
  await db.db().collection('items').find().toArray().then(items => {
    res.json(items)
  })
}

exports.home = async function(req, res){
    const database =db.db()

    try {
      let items = await database.collection('items').find().toArray()
      //console.log("Fetched items from the database:", items)
      res.send(`<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple To-Do App</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
      </head>
      <body>
        <div class="container">
          <h1 class="display-4 text-center py-1">To-Do App</h1>
          
          <div class="jumbotron p-3 shadow-sm">
            <form id="create-form" action="/create-item" method="POST">
              <div class="d-flex align-items-center">
                <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                <button class="btn btn-primary">Add New Item</button>
              </div>
            </form>
          </div>
          
          <ul id="item-list" class="list-group pb-5">
          </ul>
          
        </div>
        <script>
        let items = ${JSON.stringify(items)}
        </script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script type="application/javascript" src="/browser.js"></script>
      </body>
      </html>`)

    } catch(err) {
      console.error("Error fetching items:", err)
      res.status(500).send("Internal Server Error")
    }
  }

 