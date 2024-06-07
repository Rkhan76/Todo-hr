require('dotenv').config()
const jwt = require('jsonwebtoken')
const { STATUS_CODE } = require("../constant/httpStatusCode")

async function checkAuth(req, res, next) {
  const token = req.headers.token

  try{
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    console.log(verify.id)
    req.body.username = verify.username
    req.body.auther = verify.id
    next()
  }catch(error){
    return res.status(STATUS_CODE.UNAUTHORIZED).json({ msg: "Invalid token"})
  }
}


module.exports = {
    checkAuth,
}
