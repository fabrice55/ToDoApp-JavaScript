const dotenv = require('dotenv')
dotenv.config()
const db = require('../db')
const {ObjectId} = require('mongodb')
const sanitizeHTML = require('sanitize-html')
const jwt = require("jsonwebtoken")


exports.create = async function (req, res) {
  let safeText = sanitizeHTML(req.body.text, {allowedTags: [], allowedAttributes: {}})
   await db.db().collection("items").insertOne({text: safeText}).then(function(err, info) {
    info = {insertedId: new ObjectId(req.body.id)}
    res.json({_id:info.insertedId.toString(), text: req.body.text})
   })
}

exports.apiCreate = async function (req, res) {
  if (!req.body.item) {
    return res.status(400).json({ error: "Missing 'item' field in request body" })
  }

  let safeText = sanitizeHTML(req.body.item, { allowedTags: [], allowedAttributes: {} })
  await db.db().collection("items").insertOne({ text: safeText }).then(result => {
    info = {insertedId: new ObjectId(req.body.id)}
    res.json({ id:info.insertedId.toString(), item: req.body.item, message:"Todo sucessfully added"})
  }).catch(errors => {
    res.json(errors)
  })
  
}