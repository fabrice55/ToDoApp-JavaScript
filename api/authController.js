const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')

exports.createToken = function(req, res) {
    const apiUser = { id: 1, username: "learnUser", role: "admin" }

    const token = jwt.sign(apiUser, process.env.JWT_SECRET, { expiresIn: "30d" })
    res.json({ message:"Token Successfully created", token })
}

exports.verifyToken = function(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Token required" })
    }
  
    const token = authHeader.split(" ")[1]
    try {
        req.apiUser = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" })
    }
}