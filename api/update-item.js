const { text } = require('express')
const db = require('../db')
const {ObjectId} = require('mongodb')
const sanitizeHTML = require('sanitize-html')

exports.update= async function(req, res) {
    let safeText = sanitizeHTML(req.body.text, {allowedTags: [], allowedAttributes: {}})
     await db.db().collection("items").findOneAndUpdate({_id: new ObjectId(req.body.id)}, {$set:{text:safeText}}).then(function() {
     res.send("Success")
    }) 
}

exports.apiUpdate= async function(req, res) {
    let safeText = sanitizeHTML(req.body.text, {allowedTags: [], allowedAttributes: {}})
    await db.db().collection("items").findOneAndUpdate(
        {_id: new ObjectId(req.body.id)}, 
        {$set:{text:safeText}})
        .then(function() {
            res.send({message:"Todo successful updated", updatedId:{id:req.body.id, text:req.body.text}})
        }) 
}