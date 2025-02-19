const apiRouter = require("express").Router()
const createItem = require('./api/create-item')
const updateItem = require('./api/update-item')
const deleteItem = require('./api/delete-item')
const viewItems = require('./api/index')
const authController = require('./api/authController')

apiRouter.post('/login', authController.createToken)
apiRouter.post('/create-item', authController.verifyToken, createItem.apiCreate)
apiRouter.post('/update-item', authController.verifyToken, updateItem.apiUpdate)
apiRouter.post('/delete-item', authController.verifyToken, deleteItem.apiDelete)
apiRouter.post('/view-items', authController.verifyToken, viewItems.apiViewListOfItems)


module.exports = apiRouter