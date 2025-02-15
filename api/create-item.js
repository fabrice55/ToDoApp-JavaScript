const db = require('../db')
const {ObjectId} = require('mongodb')
const sanitizeHTML = require('sanitize-html')


exports.create = async function (req, res) {
  let safeText = sanitizeHTML(req.body.item, {allowedTags: [], allowedAttributes: {}})
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
  const result = await db.db().collection("items").insertOne({ text: safeText })

  res.json({ _id: result.insertedId.toString(), text: safeText })
}