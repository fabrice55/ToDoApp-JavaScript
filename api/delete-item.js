const db = require('../db')
const {ObjectId} = require('mongodb')
const sanitizeHTML = require('sanitize-html')

exports.delete = async function(req, res) {
    await db.db().collection("items").deleteOne({_id: new ObjectId(req.body.id)}).then(function() {
      res.send("Success")
     }) 
   }


exports.apiDelete = async function(req, res) {
    await db.db().collection("items").deleteOne({_id: new ObjectId(req.body.id)}).then(function() {
      res.send("Success")
     }) 
   }