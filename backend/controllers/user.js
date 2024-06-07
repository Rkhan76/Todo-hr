// require('dotenv').config()
const bcrypt = require("bcrypt")
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { STATUS_CODE } = require('../constant/httpStatusCode')

async function userSignup(req, res) {
  const { username, password } = req.body

  

  try {
    const findUserExists = await User.findOne({ username })

    if (findUserExists) {
      return res
        .status(STATUS_CODE.CONFLICT)
        .json({ msg: 'Username already exists' })
    } else {

     const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    if(!hashedPassword){
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: "Something wrong while hashing password"})
    }

    const newUser = await User.create({ username, password: hashedPassword })
      if (newUser) {
        return res
          .status(STATUS_CODE.CREATED)
          .json({ msg: 'User registered successfully' })
      }

      

      
    }
  } catch (error) {
    console.error('Error during user registration:', error)
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ msg: 'An error occurred during registration' })
  }
}

async function userSignIn(req, res) {
  const { username, password } = req.body

  console.log(password)
  console.log(username)

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ msg: 'Invalid username or password' })
    }

    const checkPassword = bcrypt.compare(password,user.password)

    if(!checkPassword){
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ msg: 'Invalid username or password' })
    }


    const token = jwt.sign({ username, id: user._id }, process.env.JWT_SECRET)

    if (!token) {
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Something wrong with the server' })
    }

    return res.status(STATUS_CODE.OK).json({ msg: 'SignIn successfully', token })
  } catch (error) {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .json({ msg: 'Invalid username or password' })
  }
}

module.exports = {
  userSignup,
  userSignIn,
}
