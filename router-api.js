const apiRouter = require("express").Router()
const createItem = require('./api/create-item')
const updateItem = require('./api/update-item')
const deleteItem = require('./api/delete-item')
const viewItems = require('./api/index')


apiRouter.post('/create-item', createItem.apiCreate)
apiRouter.post('/update-item', updateItem.apiUpdate)
apiRouter.post('/delete-item', deleteItem.apiDelete)
apiRouter.post('/view-items', viewItems.apiViewListOfItems)


module.exports = apiRouter